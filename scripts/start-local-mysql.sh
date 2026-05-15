#!/bin/zsh

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
MYSQL_ROOT="$HOME/.codex-mysql/finance-consulting"
DATA_DIR="$MYSQL_ROOT/data"
RUN_DIR="$MYSQL_ROOT/run"
SOCKET_PATH="$RUN_DIR/mysql.sock"
PID_PATH="$RUN_DIR/mysql.pid"
LOG_PATH="$RUN_DIR/mysql.err"

mkdir -p "$RUN_DIR"

if [ ! -d "$DATA_DIR/mysql" ]; then
  echo "MySQL data directory is missing: $DATA_DIR"
  echo "Run: ./scripts/setup-local-mysql.sh"
  exit 1
fi

if [ -f "$PID_PATH" ] && kill -0 "$(cat "$PID_PATH")" 2>/dev/null; then
  echo "Local MySQL is already running on 127.0.0.1:3307"
  exit 0
fi

/usr/local/mysql/bin/mysqld \
  --basedir=/usr/local/mysql \
  --datadir="$DATA_DIR" \
  --socket="$SOCKET_PATH" \
  --pid-file="$PID_PATH" \
  --log-error="$LOG_PATH" \
  --port=3307 \
  --bind-address=127.0.0.1 \
  --mysqlx=0 \
  --daemonize

echo "Local MySQL started on 127.0.0.1:3307"
