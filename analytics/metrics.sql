-- Same cohort and deadline semantics as dist/domain.js. NULL for no resolved cases.
SELECT COUNT(*) AS total,
 COALESCE(SUM(status != 'Resolved'),0) AS active,
 COALESCE(SUM(status = 'Resolved'),0) AS resolved,
 COALESCE(SUM(status != 'Resolved' AND created_at + sla_hours*3600 <= :now),0) AS overdue,
 COALESCE(SUM(status = 'Resolved' AND resolved_at <= created_at + sla_hours*3600),0) AS resolved_on_time,
 1.0*SUM(status = 'Resolved' AND resolved_at <= created_at + sla_hours*3600)
   / NULLIF(SUM(status = 'Resolved'),0) AS on_time_rate,
 COALESCE(SUM(reopen_count > 0),0) AS ever_reopened
FROM requests;
