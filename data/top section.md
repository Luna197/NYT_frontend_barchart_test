## top section
```sql
SELECT
order_id, dimension, dimension_details, clicks / impressions as Dimension_CTR, industry_clicks / industry_impressions as Industry_CTR
FROM
[nyt-adtech-dev.campaignscope.cs_complete_order_vw]
WHERE order_id = 2521420541 and dimension = "section"
Order by Dimension_CTR DESC
limit 3

```

## bottom section

```sql
SELECT
order_id, dimension, dimension_details, clicks / impressions as Dimension_CTR, industry_clicks / industry_impressions as Industry_CTR
FROM
[nyt-adtech-dev.campaignscope.cs_complete_order_vw]
WHERE order_id = 2521420541 and dimension = "section"
Order by Dimension_CTR ASC
limit 3

```
## 2521420541 order_overall line

```sql
SELECT
order_id, dimension, dimension_details, clicks / impressions as Dimension_CTR, industry_clicks / industry_impressions as Industry_CTR
FROM
[nyt-adtech-dev.campaignscope.cs_complete_order_vw]
WHERE order_id = 2521420541 and dimension = "order_overall"

```

## all section table
```sql
SELECT
order_id, dimension, dimension_details, clicks / impressions as Dimension_CTR, industry_clicks / industry_impressions as Industry_CTR
FROM
[nyt-adtech-dev.campaignscope.cs_complete_order_vw]
WHERE order_id = 2521420541 and dimension = "section"
Order by Dimension_CTR DESC

```

## page type data

```sql
SELECT
order_id, dimension, dimension_details, clicks / impressions as Dimension_CTR, industry_clicks / industry_impressions as Industry_CTR
FROM
[nyt-adtech-dev.campaignscope.cs_complete_order_vw]
WHERE order_id = 2480100899 and dimension = "cat_type"
Order by Dimension_CTR DESC
limit 3
```

## 2480100899 page type order_overall

```sql
SELECT
order_id, dimension, dimension_details, clicks / impressions as Dimension_CTR, industry_clicks / industry_impressions as Industry_CTR
FROM
[nyt-adtech-dev.campaignscope.cs_complete_order_vw]
WHERE order_id = 2480100899 and dimension = "order_overall"
```