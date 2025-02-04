/**
 * 進捗率の計算用関数
 * ゼロ除算はデータ登録時に弾くようにバリデーションを書けているので
 * 条件判別はしない
 * @param currentValue  現在のページ数
 * @param totalValue    総ページ数
 * @returns             0 か 計算した進捗率 (小数点以下は切り捨て)
 */
export function calculateProgress(
  currentValue: number | null,
  totalValue: number | null
) {
  if (currentValue === null || totalValue === null) {
    return 0;
  }
  // ○○.△△ -> ○○ に切り捨てて整数で返却
  return Math.floor((currentValue / totalValue) * 100);
}
