// ==UserScript==
// @name         扇贝隐藏自带内容
// @namespace    http://tampermonkey.net/
// @version      0.50
// @description  try to take over the world!
// @author       popyoung
// @match        https://web.shanbay.com/wordsweb/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=shanbay.com
// @grant        none
// ==/UserScript==
function shuffleArrayStartingFromIndex(array, startIndexToSkip) {
    for (let i = array.length - 1; i > startIndexToSkip; i--) {
        const j = Math.floor(Math.random() * (i - startIndexToSkip + 1)) + startIndexToSkip;
        [array[i], array[j]] = [array[j], array[i]];
    }
}

(function () {
    'use strict';
    var reminderText;
    // 检查是否已经存在具有相同规则的<style元素
    var existingStyle = document.querySelector('style[data-rule="hideTips"]');
    if (!existingStyle) {
        var style = document.createElement('style');
        style.setAttribute('data-rule', 'hideTips');
        style.innerHTML = '.BayTrans_paraphrase__2JMIz { color: white !important;; }';
        style.innerHTML += '.index_left__2LkyW > p:nth-child(2) { color: white !important; }';
        style.innerHTML += 'div.index_exemplarySentenceDetail__2Cq1p:nth-child(1) > div:nth-child(1) > div:nth-child(1) { color: white !important;; }';
        style.innerHTML += 'div.index_name__1gkfJ { color: white !important;; }';
        style.innerHTML += 'div.index_sentenceCn__XJD1u { color: white !important;; }';
        style.innerHTML += '.Nav_nav__3kyeO .Nav_container__sBZA1 .Nav_itemsWrapper__3FUxo {display:none;}'
        style.innerHTML += '.Nav_nav__3kyeO .Nav_container__sBZA1,.SubNav_subnav__1HR8R .SubNav_container__1zXeP,.Layout_page__2Wedt .Layout_main__2_zw8 {width:auto;margin-left: 10px;margin-right: 10px;}'
        style.innerHTML += '.searchContainer {width:167px;}'
        style.innerHTML += '.searchContainer .input {width:132px;}'
        style.innerHTML += '.index_myNotesWrap__OhD8w .index_noteDetail__3QLjB .index_noteDetailContainer__Je-Iu .index_noteDetailInner__2Jl9k .index_right__3luD3 {margin-left: 24px;}'
        style.innerHTML += '.index_myNotesWrap__OhD8w .index_noteDetail__3QLjB .index_noteDetailContainer__Je-Iu .index_noteDetailInner__2Jl9k {font-size:18px;}'
        style.innerHTML += '.index_container__LuiIf .index_left__2LkyW {font-size:18px;}'
        style.innerHTML += '.index_trash__2coNz {display:none;}'
        style.innerHTML += '.index_myNotesWrap__OhD8w .index_noteDetail__3QLjB .index_noteDetailContainer__Je-Iu .index_noteDetailInner__2Jl9k .index_left__3SFmQ>p {margin-bottom:15px;display: flex;}'
        style.innerHTML += '.index_myNotesWrap__OhD8w .index_noteDetail__3QLjB .index_noteDetailContainer__Je-Iu .index_noteDetailInner__2Jl9k .index_left__3SFmQ>p::before {content: "\\021D2\\020";color: #1171b2;padding-right: 8px;margin-left:-30px;}'
        style.innerHTML += '.block-center {margin-left: inherit;}'
        style.innerHTML += '.span9 {width: 740px;}'
        style.innerHTML += '.StudyPage_studyPage__1Ri5C {max-width: 1200px;}'
        style.innerHTML += '.index_wrap__2PaUx {display: none;}'
        style.innerHTML += '.Footer_footerWrap__L4iuD {display: none;}'
        style.innerHTML += '.Layout_page__2Wedt {padding-bottom: 50px;}'
        style.innerHTML += '.index_status__15KG5 {width: 1000px;}'
        style.innerHTML += '.index_status__15KG5 .index_vocabularyLink__1c7FY {right: 80px;}'
        style.innerHTML += 'textarea {height: 270px !important;font-size:18px !important;}'
        style.innerHTML += '.index_createNote__1IzQf  {width:unset;}'
        //style.innerHTML += 'body {line-height: 2.2;}'
        document.head.appendChild(style);

        var style2 = document.createElement('style');
        style2.textContent = '.StudyPage_studyPage__1Ri5C .StudyPage_nextBtn__1ygGn {right: 16px;} .block-center {margin-right: auto; margin-left: inherit;}';
        document.head.appendChild(style2);
        if (window.screen.height < 600) {
            var style3 = document.createElement('style');
            style3.textContent = '.StudyPage_studyPage__1Ri5C .StudyPage_nextBtn__1ygGn {top: 30%}';
            document.head.appendChild(style3);
        }

        var btnOnRight = 1;
        // 创建按钮元素并添加样式和事件
        var button = $('<button>', {
            text: '切换按钮位置',
            class: 'switchBtn',
            click: function () {
                if (btnOnRight == 1) {
                    btnOnRight = 0;
                    style2.textContent = '.StudyPage_studyPage__1Ri5C .StudyPage_nextBtn__1ygGn {left: 12px;} .block-center {margin-right: inherit; margin-left: auto;}'
                }
                else {
                    btnOnRight = 1;
                    style2.textContent = '.StudyPage_studyPage__1Ri5C .StudyPage_nextBtn__1ygGn {right: 16px;} .block-center {margin-right: auto; margin-left: inherit;}';
                }
            },
            css: {
                'background': '#28bea0',
                'cursor': 'pointer',
                'border-radius': '6px',
                'padding': '4px 12px',
                'color': '#fff',
                'font-size': '16px',
                'position': 'absolute',
                'right': '10px'
            }
        });

        // 将按钮添加到元素容器中
        $('.SubNav_container__1zXeP').append(button);

        function simulateKeyPress(key) {
            // 创建一个 KeyboardEvent 对象
            var event = new KeyboardEvent('keydown', {
                key: key,
            });

            // 分发事件
            document.dispatchEvent(event);
        }

        $(document).on('keydown', function (event) {
            if (event.key === '1') {
                // 模拟键盘输入d
                var btn = $('.StudyPage_nextBtn__1ygGn');
                if (btn.length > 0) {
                    setTimeout(function () { simulateKeyPress('d') }, 100);
                }
            }
        });

        var audio_b64 = 'Base64 data: data:video/ogg;base64,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';
        var minutes = 0; // 设置分钟数
        var seconds = 0; // 设置秒数

        function convertURIToBinary(dataURI) {
            let BASE64_MARKER = ';base64,';
            let base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
            let base64 = dataURI.substring(base64Index);
            let raw = window.atob(base64);
            let rawLength = raw.length;
            let arr = new Uint8Array(new ArrayBuffer(rawLength));

            for (let i = 0; i < rawLength; i++) {
                arr[i] = raw.charCodeAt(i);
            }
            return arr;
        }

        let binary = convertURIToBinary(audio_b64);
        let blob = new Blob([binary], {
            type: 'audio/ogg'
        });
        let blobUrl = URL.createObjectURL(blob);
        var audioElement = $('<audio/>');
        audioElement.attr('src', blobUrl);
        audioElement[0].load();

        // 更新计时器显示
        function updateTimer() {
            var timerDisplay = $('#timer');
            timerDisplay.text(padZero(minutes) + ':' + padZero(seconds));
        }
        $(document).bind('keydown', function (event) {
            if (event.keyCode == 69) {
                $('.index_wrap__2PaUx').toggle();
                //playReminder();
            }
        });
        // 补零函数，确保显示两位数
        function padZero(number) {
            return (number < 10 ? '0' : '') + number;
        }
        var count = 0;
        var autoScroll = 1;
        setInterval(function () {
            var vocabPron = $('.VocabPronounce_vcoabPronounce__2D0UH');
            if (vocabPron.length > 0) {
                if (vocabPron.children().length === 3) {
                    var newElement = $('<div id="timer">00:00</div>');
                    seconds = 0;
                    minutes = 0;
                    vocabPron.append(newElement);
                    vocabPron.append(audioElement);
                    autoScroll = 1;
                }
                if (count++ % 5 === 0) {
                    updateTimer();
                    if (seconds == 59) {
                        seconds = 0;
                        minutes++;
                        audioElement[0].play();
                    } else {
                        seconds++;
                    }
                }
            }
            else {
                if (autoScroll === 1) {
                    window.scrollTo(0, 100);
                    autoScroll = 0;
                }
            }
            var button = $("h6:contains('真题例句')");
            if (button.length > 0) {
                if (button.css("cursor") == "auto") {
                    button.on("click", function () {
                        $('.index_wrap__2PaUx').toggle();
                    });
                    //使用jQuery的bind方法，给document绑定keypress事件

                    button.css({
                        background: "#28bea0",
                        cursor: "pointer",
                        "border-radius": "6px",
                        "padding-left": "4px",
                        color: "white"
                    });
                }
            }
            var myDiv = $('.index_left__3SFmQ');
            // 获取 div 内的文本内容

            var textContent = myDiv.text();
            if (textContent == "")
                return;
            var hasPTag = myDiv.find('p').length + myDiv.find('textarea').length > 0;
            if (hasPTag) {
                return;
            }
            // 使用正则表达式将文本按行拆分
            var lines = textContent.split('\n');
            var index = 0;
            for (let i = 0; i < lines.length; i++) {
                index = i;
                if (/^[A-z]/.test(lines[i]))
                    break;
            }
            shuffleArrayStartingFromIndex(lines, index);

            reminderText = '';

            // 用于存储包含 <p> 标签的新文本内容
            var newTextContent = '';
            // 遍历每一行，添加 <p> 标签
            for (let i = 0; i < lines.length; i++) {
                if (lines[i] != "") {
                    reminderText += '<p>' + lines[i] + '</p>';
                    newTextContent += '<p>' + lines[i].replace(/(?<=[=≈] .*)[A-z]+/g, '?'); + '</p>';
                }
            }

            // 将新文本内容设置回 div
            myDiv.html(newTextContent);
            window.scrollTo(0, document.body.scrollHeight);
        }, 200);
    }

    function lookup() {
        $('.BayTrans_paraphrase__2JMIz').css('background-color', 'black');
        $('.index_left__2LkyW > p:nth-child(2)').css('background-color', 'black');
        $('div.index_exemplarySentenceDetail__2Cq1p:nth-child(1) > div:nth-child(1) > div:nth-child(1)').css('background-color', 'black');
        $('div.index_name__1gkfJ').css('background-color', 'black');
        $('div.index_sentenceCn__XJD1u').css('background-color', 'black');
        $('.index_left__3SFmQ').html(reminderText);
        if (window.screen.height >= 600) {
            var newTab = window.open('gdlookup://localhost/' + $('div.VocabPronounce_word__17Tma').text(), "_blank");
            newTab.close();
        }
    }

    $(document).keydown(function (event) {
        // 检查按下的键是否是空格键（空格键的键码是 32）
        if (event.which === 32) {
            event.preventDefault();
            lookup();
        }
    });

    var timer;
    $(document).on('touchstart', function () {
        // 开始计时器，模拟长按事件
        timer = setTimeout(function () {
            lookup();
        }, 1000); // 1000毫秒（1秒）为长按时间
    });

    $(document).on('touchend', function () {
        // 清除计时器
        clearTimeout(timer);
    });
})();
