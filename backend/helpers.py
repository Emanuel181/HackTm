from shapely.geometry import shape, Point, Polygon, MultiPolygon
from firebase_client import db  # Firestore client
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
    from collections import defaultdict
    import json

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

print(get_all_heatmap_problems())