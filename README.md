# Know Your Demo　認識台灣民主先驅

翻牌配對遊戲，認識台灣黨外運動的歷史人物。

## 玩法

- 點擊牌背翻牌
- 找出兩張相同的人物牌完成配對
- 配對成功後顯示該人物的歷史介紹

## 人物列表

| 人物 | 在位/年份 | 狀態 |
|------|-----------|------|
| 許世賢 | 1908–1983 | ✅ 可配對 |
| 余登發 | 1904–1989 | 🔒 即將登場 |
| 許信良 | 1941– | 🔒 即將登場 |
| 黃信介 | 1928–1999 | 🔒 即將登場 |
| 呂秀蓮 | 1944– | 🔒 即將登場 |
| 林義雄 | 1941– | 🔒 即將登場 |

## 解鎖新人物

在 `game.js` 的 `CHARACTERS` 陣列中：

1. 將目標人物的 `comingSoon: true` 改為 `false`
2. 填入 `description` 欄位
3. 在 `scenes` 陣列加入內容（`type: 'youtube'` 或 `type: 'info'`）

```js
{
  id: 'yu-teng-fa',
  name: '余登發',
  comingSoon: false,          // ← 改這裡
  description: '...',          // ← 填入說明
  scenes: [
    { type: 'youtube', videoId: 'YOUR_ID', caption: '...' }
  ]
}
```

## 部署

**GitHub Pages**

```
Settings → Pages → Source: Deploy from a branch → main / (root) → Save
```

網址格式：`https://coolbeardcool-lang.github.io/Knowyourdemo/`

## 技術

純 HTML / CSS / JavaScript，無需框架或後端，可直接部署至 GitHub Pages。
