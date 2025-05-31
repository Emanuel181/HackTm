from shapely.geometry import shape, Point, Polygon, MultiPolygon
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