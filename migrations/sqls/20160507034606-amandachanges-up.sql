DROP VIEW public.totals_by_lot;

CREATE OR REPLACE VIEW public.totals_by_lot AS 
  SELECT scan.lot_number,
    scan.station_code,
    sum(scan.weight_1) AS weight_1,
    scan.grade,
    scan.species,
    null as size,
    sum(scan.pieces) AS pieces,
    NULL::bigint AS boxes
   FROM scan
  WHERE scan.lot_number IS NOT NULL AND scan.lot_number::text <> ''::text AND scan.loin_number IS NULL AND scan.box_number IS NULL
  GROUP BY scan.lot_number, scan.station_code, scan.grade, scan.species
UNION
 SELECT box_with_info.lot_number,
    box_with_info.station_code,
    sum(box_with_info.weight) AS weight_1,
        CASE
            WHEN box_with_info.grade IS NOT NULL THEN box_with_info.grade
            ELSE box_with_info.product_type
        END AS grade,
    null as species,
    box_with_info.size,
    NULL::bigint AS pieces,
    count(box_with_info.box_number) AS boxes
   FROM box_with_info
  WHERE box_with_info.lot_number IS NOT NULL AND box_with_info.lot_number::text <> ''::text
  GROUP BY box_with_info.lot_number, box_with_info.station_code, box_with_info.grade, box_with_info.product_type, box_with_info.size
UNION
 SELECT loin_with_info.lot_number,
    loin_with_info.station_code,
    sum(loin_with_info.weight_1) AS weight_1,
    loin_with_info.grade,
    null as species,
    null as size,
    count(loin_with_info.loin_number) AS pieces,
    NULL::bigint AS boxes
   FROM loin_with_info
  WHERE loin_with_info.lot_number IS NOT NULL AND loin_with_info.lot_number::text <> ''::text AND NOT (loin_with_info.station_code::text IN ( SELECT scan.station_code
           FROM scan
          WHERE scan.box_number IS NOT NULL))
  GROUP BY loin_with_info.lot_number, loin_with_info.station_code, loin_with_info.grade
  ORDER BY 4;

ALTER TABLE public.totals_by_lot
  OWNER TO tuna_processor;