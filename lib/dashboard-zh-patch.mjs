#!/usr/bin/env node
/**
 * OpenClaw Web Dashboard Chinese Localization Patch
 * Replaces hardcoded English strings in compiled JS with Chinese translations.
 * Meant to be run after `npm install -g openclaw` inside proot Ubuntu.
 */
import fs from "fs";
import path from "path";

const dir = "/usr/lib/node_modules/openclaw/dist/control-ui/assets";
if (!fs.existsSync(dir)) process.exit(0);

const files = fs.readdirSync(dir);
const idx = files.find(f => f.startsWith("index-") && f.endsWith(".js"));
if (!idx) process.exit(0);

const fp = path.join(dir, idx);
let js = fs.readFileSync(fp, "utf8");
let n = 0;
const R = [
  [/yV\(J\.eye,`Security`/g, "yV(J.eye,`安全`"],
  [/yV\(J\.spark,`Appearance`/g, "yV(J.spark,`外观`"],
  [/yV\(J\.send,`Channels`/g, "yV(J.send,`频道`"],
  [/J\.brain,`Model & Thinking`/g, "J.brain,`模型与思考`"],
  [/qs-row__label">Model</g, 'qs-row__label">模型<'],
  [/qs-row__label">Thinking</g, 'qs-row__label">思考<'],
  [/qs-row__label">Fast mode</g, 'qs-row__label">快速模式<'],
  [/qs-row__label">Gateway auth</g, 'qs-row__label">网关认证<'],
  [/qs-row__label">Exec policy</g, 'qs-row__label">执行策略<'],
  [/qs-row__label">Device auth</g, 'qs-row__label">设备认证<'],
  [/qs-row__label">Theme</g, 'qs-row__label">主题<'],
  [/qs-row__label">Assistant</g, 'qs-row__label">助手<'],
  [/qs-row__label">Version</g, 'qs-row__label">版本<'],
  [/Configure →<\/button>/g, "配置 →</button>"],
  [/Connect →<\/button>/g, "连接 →</button>"],
  [/No channels configured/g, "未配置频道"],
  [/On — cheaper, less capable/g, "开 — 更便宜，能力较弱"],
  ["Fast mode enabled.", "快速模式已开启。"],
  ["Fast mode disabled.", "快速模式已关闭。"],
  ["Fast mode reset to default.", "快速模式已重置为默认。"],
  ["Failed to set fast mode", "快速模式设置失败"],
];
for (const [a, b] of R) { n += (js.match(a) || []).length; js = js.replace(a, b); }
js = js.replace(/(\d+) connected<\/span>/g, (_, m) => m + " 已连接</span>");
fs.writeFileSync(fp, js, "utf8");
console.log(`[zh] Patched ${n} strings in ${idx}`);
