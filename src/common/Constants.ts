
export const Channels = {
  DoLog: 'do-log',
  WindowRestore: 'window-restore',
  FetchWindowState: 'fetch-window-state',
  MinimizeWindow: 'minimize-window',
  MaximizeWindow: 'maximize-window',
  UnmaximizeWindow: 'unmaximize-window',
  EnterFullScreen: 'enter-fullscreen',
  CloseWindow: 'close-window',
  TerminalServer: {
    Open: 'Open',
    Write: 'Write',
    Stdout: 'Stdout',
    Stderr: 'Stderr',
    Close: 'Close',
    CloseAll: 'CloseAll'
  }
}

export const WINDOW_STATE = {
  FULLSCREEN: 0,
  MAXIMIZED: 1,
  MINIMIZED: 2,
  HIDDEN: 3,
  NORMAL: 4
}