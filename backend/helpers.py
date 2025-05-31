from shapely.geometry import shape, Point, Polygon, MultiPolygon
from firebase_client import db  # Firestore client
from collections import defaultdict
import json

def get_neighborhood_for_point(lat, lon, json_path="./cartiere.json"):
    """
    Check which neighborhood contains the given (lat, lon) point.
    """
    point = Point(lat, lon)

    with open(json_path, "r", encoding="utf-8") as f:
        neighborhoods = json.load(f)

    for neighborhood in neighborhoods:
        name = neighborhood["name"]
        geometry = neighborhood["geometry"]
        coords = geometry["coordinates"]

        l = []
        for coords2 in coords[0]:
            coord = (coords2[0],coords2[1])
            l.append(coord)
        t=tuple(l)
        #print(t)

        if geometry["type"] == "Polygon":
            polygon = Polygon(t)
            if polygon.covers(point):
                return name
        elif geometry["type"] == "MultiPolygon":
            multipolygon = MultiPolygon([
                Polygon([tuple(coord) for coord in poly[0]])
                for poly in coords
            ])
            if multipolygon.covers(point):
                return name

    return None

def get_all_heatmap_problems(json_path="./cartiere.json"):

    with open(json_path, "r", encoding="utf-8") as f:
        neighborhoods = json.load(f)

    scores_by_neighborhood = {}

    docs = db.collection("sesizari").stream()
    all_sesizari = [doc.to_dict() for doc in docs]

    for neighborhood in neighborhoods:
        name = neighborhood.get("name") or list(neighborhood.keys())[0]

        sesizari_in_zone = [s for s in all_sesizari if s.get("cartier") == name]

        if not sesizari_in_zone:
            continue

        # Compute per-category vote score
        category_scores = defaultdict(int)
        for s in sesizari_in_zone:
            category = s.get("categorie")
            if not category:
                continue
            upvotes = s.get("upvotes", 0)
            downvotes = s.get("downvotes", 0)
            score = upvotes - downvotes
            category_scores[category] += score

        if category_scores:
            top_category = max(category_scores, key=category_scores.get)
            scores_by_neighborhood[name] = top_category

    return scores_by_neighborhood

def get_all_heatmap_security(json_path="./weighted_subcategories.json"):
    # Load subcategory weights
    with open(json_path, "r", encoding="utf-8") as f:
        weights = json.load(f)

    # Fetch all sesizari
    docs = db.collection("sesizari").stream()
    all_sesizari = [doc.to_dict() for doc in docs]

    # Aggregation structures
    zone_weighted_scores = defaultdict(float)
    zone_post_counts = defaultdict(int)
    zone_vote_counts = defaultdict(int)

    for s in all_sesizari:
        cartier = s.get("cartier")
        subcat = s.get("subcategorie")
        status = s.get("status", "").lower()
        upvotes = s.get("upvotes", 0)
        downvotes = s.get("downvotes", 0)

        if not cartier or not subcat:
            continue

        # Apply weight = 0 if status is "solutionat"
        base_weight = weights.get(subcat, 0)
        weight = 0 if status == "solutionat" else base_weight

        score = (upvotes - downvotes) * weight
        zone_weighted_scores[cartier] += score
        zone_post_counts[cartier] += 1
        zone_vote_counts[cartier] += upvotes + downvotes

    # Compute final score using weighted average and confidence
    all_final_scores = {}

    for zone in zone_weighted_scores:
        posts = zone_post_counts[zone]
        votes = zone_vote_counts[zone]
        confidence = max(posts, votes)

        if posts == 0:
            continue

        average_score = zone_weighted_scores[zone] / posts
        all_final_scores[zone] = average_score * confidence

    if not all_final_scores:
        return {}

    # Normalize between 0 and 1
    min_score = min(all_final_scores.values())
    max_score = max(all_final_scores.values())

    if max_score == min_score:
        return {zone: 1.0 for zone in all_final_scores}

    normalized_scores = {
        zone: round((score - min_score) / (max_score - min_score), 4)
        for zone, score in all_final_scores.items()
    }

    return normalized_scores