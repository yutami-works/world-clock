/* HTML要素 */
const cityElm = document.getElementById("city");         // タイムゾーン選択
const timezoneElm = document.getElementById("timezone"); // タイムゾーン表示
const timeElm = document.getElementById("time");         // 日付表示
const dateElm = document.getElementById("date");         // 時間表示

/* 曜日取得関数 */
const convertDayNum2DayOfWeek = (dayNumber) => {
  const dayOfWeekArray = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayOfWeek = dayOfWeekArray[dayNumber];

  return dayOfWeek;
}

// 時計の表示更新
const updateClock = () => {
  // 現在の日時
  var now = new Date();

  // Tokyoの時間（ミリ秒）
  var timeTokyo = now.getTime();

  // UTC（協定世界時）の時間（ミリ秒）
  var timeUTC = timeTokyo - 9 * 60 * 60 * 1000;

  // 選択された都市のタイムゾーン
  var index = cityElm.selectedIndex;
  var timeZone = cityElm.options[index].value;

  // タイムゾーンをセット
  timezoneElm.innerHTML = "Timezone:" + timeZone;

  // 選択された都市の時間（ミリ秒）
  var timeCity = timeUTC + timeZone * 60 * 60 *1000;

  // 選択された都市の日時
  now = new Date(timeCity);

  // 時間の取得
  var hour = now.getHours();
  // 分の取得
  var min = now.getMinutes();
  // 秒の取得
  var sec = now.getSeconds();

  // 2桁表示に変更
  if (hour < 10) hour = "0" + hour;
  if (min < 10) min = "0" + min;
  if (sec < 10) sec = "0" + sec;

  // 時間をセット
  timeElm.innerHTML = hour + ":" + min + ":" + sec;

  // 年の取得
  var year = now.getFullYear();
  // 月の取得
  var month = now.getMonth() + 1;
  // 日の取得
  var day = now.getDate();

  // 月、日を2ケタ表示に変更
  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;

  // 曜日の取得
  const dayNum = now.getDay();
  const dow = convertDayNum2DayOfWeek(dayNum);

  // 日付をセット
  dateElm.innerHTML = year + "/" + month + "/" + day + " " + dow;
}

/* メイン関数 */
const main = () => {
  // 1秒ごとに要素を更新する
  const intervalMS = 1000;
  const intervalID = setInterval(updateClock, intervalMS);
}

// 実行
main();