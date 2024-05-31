/* HTML要素 */
const cityElm = document.getElementById("city");         // タイムゾーン選択
const timezoneElm = document.getElementById("timezone"); // タイムゾーン表示
const timeElm = document.getElementById("time");         // 日付表示
const dateElm = document.getElementById("date");         // 時間表示

/* 2桁ゼロパディング */
const zeroPadding2 = (number) => {
  const numStr = String(number);
  const zeroPaddingNum = numStr.padStart(2, '0');

  return zeroPaddingNum;
}

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

  // 時刻の取得
  const hour = zeroPadding2(now.getHours());  // 時
  const min = zeroPadding2(now.getMinutes()); // 分
  const sec = zeroPadding2(now.getSeconds()); // 秒

  // 時間をセット
  timeElm.innerHTML = hour + ":" + min + ":" + sec;

  // 年月日の取得
  const year = now.getFullYear();                 // 年
  const month = zeroPadding2(now.getMonth() + 1); // 月
  const day = zeroPadding2(now.getDate());        // 日

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