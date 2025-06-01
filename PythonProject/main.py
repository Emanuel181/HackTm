import geopandas as gpd

# Load full Romania dataset
romania_pop = gpd.read_file('population_romania.geojson')

# Load Timișoara boundary (must be in same CRS)
timisoara = gpd.read_file('timisoara_boundary.geojson')

# Reproject if needed
romania_pop = romania_pop.to_crs(timisoara.crs)

# Spatial filter: Keep only intersecting hexes
timisoara_pop = gpd.overlay(romania_pop, timisoara, how='intersection')

# Save to new GeoJSON
timisoara_pop.to_file('timisoara_population.geojson', driver='GeoJSON')
