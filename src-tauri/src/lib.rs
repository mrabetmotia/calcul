use tauri_plugin_updater::UpdaterExt;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .plugin(tauri_plugin_updater::Builder::new().build())
    .setup(|app| {
      if cfg!(debug_assertions) {
        app.handle().plugin(
          tauri_plugin_log::Builder::default()
            .level(log::LevelFilter::Info)
            .build(),
        )?;
      }

      // Check for updates
      if let Ok(updater) = app.handle().updater() {
        tauri::async_runtime::spawn(async move {
          match updater.check().await {
            Ok(update) => {
              if let Some(update) = update {
                log::info!("Update available: {} -> {}", update.current_version, update.version);
              } else {
                log::info!("No update available");
              }
            }
            Err(e) => {
              log::error!("Failed to check for updates: {}", e);
            }
          }
        });
      } else {
        log::error!("Failed to get updater");
      }

      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
