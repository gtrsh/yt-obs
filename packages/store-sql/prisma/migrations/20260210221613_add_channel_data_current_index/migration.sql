CREATE UNIQUE INDEX channel_data_current_unique
  ON channel_data (channel_id)
  WHERE is_current = true;
