/*
2017
Author  :  Маxim Makow
Version :  1.0
Email   :  artmakow@gmail.com
Site    :  artmakow.pro
*/
;
(function($) {
	$.fn.BlcParser = function(options) {

		//настройки
		var settings = $.extend({
			time						:		true,
			roundedNumber		: 	false,
			money						:		'usd, eur',
			background			: 	'#000',
			color						: 	'#fff',
			fontsize 				: 	'16px',
			fontfamily			: 	'Fira Code',
			ajaxurl					: 	'http://artmakow.pro/cb/cb.xml'
		}, options);

		//Глобальные переменные
		var container = this;
		var valuesMoney = settings.money.split(', ');
		var money_value = '<div class="money-value">';
		var close_div = '</div>';
		var money_name = '<div class="money-name">';

		//Коды валют и текущий курс
		var currency = {};

		//Вешаем стили
		container.css({
			'background' 	: settings.background,
			'color' 			: settings.color,
			'font-size' 	: settings.fontsize,
			'font-family' : settings.fontfamily
		});

		//Вывод текущий даты
		(function() {
			var Data = new Date();
			var Year = Data.getFullYear();
			var Month = Data.getMonth();
			var Day = Data.getDate();
			var Hour = Data.getHours();
			var Minutes = Data.getMinutes();
			var Seconds = Data.getSeconds();
			var cbRf = 'ЦБ.РФ';
			var time = Day + '.' + Month + '.' + Year;
			if (settings.time === true) {
				container.append(money_value + cbRf + close_div + money_name + time + close_div);
			}
		}());

		//Посылаем запрос, получаем XML документ
		$.ajax({
			type: "GET",
			async: false,
			url: settings.ajaxurl,
			dataType: "xml",
			success: currencyRate
		});

		//Разбираем XML документ
		function currencyRate(xml) {
			$(xml).find("Valute").each(function() {
				// var currencyID = $(this).attr('ID');
				var currencyValue = $(this).find("Value").text().replace(',', '.');
				var currencyCharCode = $(this).find("CharCode").text();
				if (settings.roundedNumber === true) {
					currency[currencyCharCode] = parseFloat( Math.round(currencyValue * 10) / 10 );
				} else {
					currency[currencyCharCode] = parseFloat( currencyValue );
				};
			});
			return currency;
		};

		//названия валют и текущий курс
		var showMoney = {
			aud: money_value + currency.AUD + close_div + money_name + /*0*/ 'Австр-ий доллар' + close_div,
			azn: money_value + currency.AZN + close_div + money_name + /*1*/ 'Азерба-ий манат' + close_div,
			gbr: money_value + currency.GBP + close_div + money_name + /*2*/ 'Анг-кий Фунт' + close_div,
			amd: money_value + currency.AMD + close_div + money_name + /*3*/ 'Армянских драмов' + close_div,
			byn: money_value + currency.BYN + close_div + money_name + /*4*/ 'Белору-ий рубль' + close_div,
			bgn: money_value + currency.BGN + close_div + money_name + /*5*/ 'Болгарский лев' + close_div,
			brl: money_value + currency.BRL + close_div + money_name + /*6*/ 'Бразильский реал' + close_div,
			huf: money_value + currency.HUF + close_div + money_name + /*7*/ 'Венг-ких форинтов' + close_div,
			hkd: money_value + currency.HKD + close_div + money_name + /*8*/ 'Гон-ских долларов' + close_div,
			dkk: money_value + currency.DKK + close_div + money_name + /*9*/ 'Датских крон' + close_div,
			usd: money_value + currency.USD + close_div + money_name + /*10*/ 'Доллар США' + close_div,
			eur: money_value + currency.EUR + close_div + money_name + /*11*/ 'Евро' + close_div,
			inr: money_value + currency.INR + close_div + money_name + /*12*/ 'Индийских рупий' + close_div,
			kzt: money_value + currency.KZT + close_div + money_name + /*13*/ 'Казах-ских тенге' + close_div,
			cad: money_value + currency.CAD + close_div + money_name + /*14*/ 'Канадский доллар' + close_div,
			kgs: money_value + currency.KGS + close_div + money_name + /*15*/ 'Киргизских сомов' + close_div,
			cny: money_value + currency.CNY + close_div + money_name + /*16*/ 'Китайских юаней' + close_div,
			mdl: money_value + currency.MDL + close_div + money_name + /*17*/ 'Молдавских леев' + close_div,
			nok: money_value + currency.NOK + close_div + money_name + /*18*/ 'Норвежских крон' + close_div,
			pnl: money_value + currency.PNL + close_div + money_name + /*19*/ 'Польский злотый' + close_div,
			ron: money_value + currency.RON + close_div + money_name + /*20*/ 'Румынский лей' + close_div,
			xdr: money_value + currency.XDR + close_div + money_name + /*21*/ 'СДР' + close_div,
			sgd: money_value + currency.SGD + close_div + money_name + /*22*/ 'Синга-кий доллар' + close_div,
			tjs: money_value + currency.TJS + close_div + money_name + /*23*/ 'Тад-ких сомони' + close_div,
			try: money_value + currency.TRY + close_div + money_name + /*24*/ 'Турецкая лира' + close_div,
			tmt: money_value + currency.TMT + close_div + money_name + /*25*/ 'Туркм-кий манат' + close_div,
			uzs: money_value + currency.UZS + close_div + money_name + /*26*/ 'Узбекских сумов' + close_div,
			uah: money_value + currency.UAH + close_div + money_name + /*27*/ 'Укр-ких гривен' + close_div,
			czk: money_value + currency.CZK + close_div + money_name + /*28*/ 'Чешских крон' + close_div,
			sek: money_value + currency.SEK + close_div + money_name + /*29*/ 'Шведских крон' + close_div,
			chf: money_value + currency.CHF + close_div + money_name + /*30*/ 'Швейц-кий франк' + close_div,
			zar: money_value + currency.ZAR + close_div + money_name + /*31*/ 'Южноаф-х рэндов' + close_div,
			krw: money_value + currency.KRW + close_div + money_name + /*32*/ 'Вон Корея' + close_div,
			jpy: money_value + currency.JPY + close_div + money_name + /*33*/ 'Японских иен' + close_div
		};

		//вывод результатов курса
		(function() {
			$.each(showMoney, function(index, value) {
				if (valuesMoney.indexOf(index) != -1) {
					container.append(value);
				}
			});
		}());
		return container;
	};
})(jQuery);

/*
Проверочка на cssgrid свойство,
если браузер не держит это свойство, отсылаем в гугл или куда еще :)
*/
$(window).on('load', function() {
	if (!Modernizr.cssgrid) {
		location.href = 'https://www.google.ru';
	};
});
