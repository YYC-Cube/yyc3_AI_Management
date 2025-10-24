/**
 * 🟢 YanYu Cloud³ 环境变量导入脚本
 * 📦 自动将 .env.dev 中的变量导入到 Vercel 平台
 * ⚠️ 请确保已安装 Vercel CLI 且登录账户
 * 👉 使用方式：ts-node vercel.env.import.ts development
 */

import fs from 'fs';
import readline from 'readline';
import { execSync } from 'child_process';

const ENV_FILE = '.env.dev';
const TARGET_ENV = process.argv[2] || 'development'; // 可选：preview / production

if (!['development', 'preview', 'production'].includes(TARGET_ENV)) {
  console.error(`❌ 无效环境：${TARGET_ENV}，请使用 development / preview / production`);
  process.exit(1);
}

console.log(`🚀 开始导入 ${ENV_FILE} 到 Vercel 环境：${TARGET_ENV}\n`);

const fileStream = fs.createReadStream(ENV_FILE);
const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

rl.on('line', (line) => {
  const trimmed = line.trim();

  // 跳过注释或空行
  if (!trimmed || trimmed.startsWith('#')) return;

  const [key, ...rest] = trimmed.split('=');
  const value = rest.join('=').trim();

  // 跳过敏感字段或空值
  if (!key || !value || ['JWT_SECRET', 'SMTP_PASS', 'SESSION_SECRET', 'CSRF_TOKEN_SECRET'].includes(key)) {
    console.log(`⚠️ 跳过变量：${key}`);
    return;
  }

  try {
    execSync(`vercel env add ${key} ${TARGET_ENV} <<< "${value}"`, { stdio: 'inherit' });
    console.log(`✅ 成功导入：${key}`);
  } catch (error) {
    console.error(`❌ 导入失败：${key}`);
  }
});

rl.on('close', () => {
  console.log(`\n🎉 所有变量处理完毕，建议在 Vercel 控制台确认状态`);
});
