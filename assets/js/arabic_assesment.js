//state object
var state = {
  questionsData: [],
  totalQuestions: 0,
  pageQuestions: [],
  lastRenderedQuestion: 0,
  percCompletion: 0,
  feedbackSummary: '',
  allChecked: false,
  totalMarks: 0,
  tempMark: 0,
  startingTime: '',
  endTime: '',
  testTime: '',
  result: '',
  levelText: '',
  wrongAnswersArr: [],
  renderedWrongAnswersArr: []
}

//state modification functions
var addQuestion = function (state, requiredQuestion, requiredChoices, requiredQuestionNumber, reqStateProp) {
  let questionInfo = {
    question: requiredQuestion,
    choices: requiredChoices,
    queNumber: requiredQuestionNumber,
  }
  if (reqStateProp === 'pageQuestions') {
    state.pageQuestions.push(questionInfo);
  }
  else {
    state.renderedWrongAnswersArr.push(questionInfo);
  }
}

var addFeedbackSummary = function (feedback) {
  state.feedbackSummary = feedback;
}

var addResultMessage = function (result) {
  state.result = result;
}

var clearPageQuestions = function () {
  state.pageQuestions = []
}

var addNumberOfQuestions = function (state, total) {
  state.totalQuestions = total;
}

var addWrongAnswerObj = function (question) {
  state.wrongAnswersArr.push(question);
}

var choicesCheck = function (status) {
  state.allChecked = status;
}

var setStartEndTime = function (type) {
  if (type === 'start') {
    state.startingTime = new Date().getTime();
  }
  else {
    state.endTime = new Date().getTime();
  }
}

var setTestTime = function () {
  const endTime = state.endTime;
  const startTime = state.startingTime;
  const diff = Math.abs(endTime - startTime);
  var hours = Math.floor((diff % (1000 * 60 * 60 * 60)) / (1000 * 60 * 60));
  var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((diff % (1000 * 60)) / 1000);

  state.testTime = hours + ':' + ('0' + minutes).slice(-2) + ':' + ('0' + seconds).slice(-2);
}

var changeTempMark = function (mark) {
  state.tempMark += mark
}

var zeroTempMark = function () {
  state.tempMark = 0
}

var answerCheckFalse = function () {
  state.answerValue = false;
}

var incrementLastRenderedQuestion = function () {
  state.lastRenderedQuestion += 10
}

var incrementCorrectAnsCount = function () {
  state.questionInfo.correctAns += 1;
}

var incrementpositiveAnsCount = function () {
  state.questionInfo.positiveAns += 1;
}

var incrementQueNumberCount = function () {
  state.questionInfo.queNumber += 1;
}

var incrementQuestionIndexCount = function () {
  state.questionInfo.questionIndex += 1;
}

var incrementTotalMark = function () {
  state.totalMarks += state.tempMark
}

var computePercentage = function () {
  const perc = (state.lastRenderedQuestion - 10) / state.totalQuestions;
  state.percCompletion = perc * 100
}
//Render functions

var renderMainDetails = function (state) {
  // var perc = state.lastRenderedQuestion - 10;
  var questionsPageRender = `<div id="questions-form" class="js-question-page">
    <h2 class="js-q-header tertiary-color">إختبار اللغة العربية</h2>
    <div class="bar-con">
      <div class="bar-sub-con">
        <h6 style="width:100%; text-align: right;">نسبة الإنجاز:</h6>
        <div id="bar1" style="direction:rtl" class="barfiller">
          <div class="tipWrap">
            <span class="tip"></span>
          </div>
          <span class="fill" data-percentage="0"></span>
        </div>
      </div>
    </div>

    <div class="js-questions-content">
    </div>
  </div > `
  $(".js-container").html(questionsPageRender);

}

var renderQuestion = function (state) {
  var checkLastAnswer = function () {
    if (state.lastRenderedQuestion >= state.totalQuestions) {
      return `<button type="submit" ${state.allChecked ? "" : "disabled"} class=\"btn-test js-choice-submit-button js-view-result\">إظهار النتيجة</button>`
    }
    else {
      return `<button type="submit" ${state.allChecked ? "" : "disabled"} class=\"btn-test js-choice-submit-button\">التالي</button>`
    }
  }
  let tenQuestionsDOM = '';
  const pageQuestions = state.pageQuestions;
  pageQuestions.forEach((item, index) => {
    const formId = 'q-' + (index + 1);
    let singleQuestionDOM = `<form id="${formId}" class="js-q-box">` +
      "<div class=\"js-question-text\">" +
      "<h5><span style=\"margin-left:5px\" class=\"js-q-number\">" + item.queNumber + ": </span></h5>" +
      "<h5><span class=\"js-q-text\">" + item.question + "</span></h5>" +
      "</div>" +
      "<div class=\"js-choices row\">" + item.choices +
      "</div>" +
      "</form>"
    tenQuestionsDOM += singleQuestionDOM;
  })
  var questionsRender = `
    ${tenQuestionsDOM}
    <div class="js-nav-box">
    ${checkLastAnswer()} 
    </div>`
  $(".js-questions-content").html(questionsRender);
  clearPageQuestions();
  // $('#bar1').calculateFill(state.lastRenderedQuestion - 10);

}


var renderCheck = function () {
  $(".js-nav-box").find("button").prop("disabled", state.allChecked ? false : true)
}

var renderResult = function () {
  var result = "";
  var totalMark = state.totalMarks;
  var message = "";
  var percentage = totalMark;
  const feedbackSummary = state.feedbackSummary;
  const numberOfQuestions = state.questionsData.length;

  if (totalMark >= 38 && totalMark <= 50) {
    message = "ممتاز";
  }
  else if (totalMark >= 26 && totalMark < 37) {
    message = "جيد جداً";
  }
  else if (totalMark >= 13 && totalMark < 25) {
    message = "جيد";
  }
  else if (totalMark >= 7 && totalMark < 12) {
    message = "متوسط";
  }
  else if (totalMark < 6 && totalMark >= 0) {
    message = "ضعيف";
  }
  addResultMessage(message);
  // ${ringColor}

  result = `<div class="js-result-page">
    <div class="js-feedback-text-con">
    <span class="js-feedback-header">نتيجتك: ${totalMark}\\${numberOfQuestions}</span>
    <div>
      <svg viewBox="0 0 36 36" class="result-ring arabic-result-ring">
      <path class="ring-bg" d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831" />
      <path class="ring" d="M18 2.0845
      a 15.9155 15.9155 0 0 1 0 31.831
      a 15.9155 15.9155 0 0 1 0 -31.831" ; stroke-dasharray="${percentage * 2}, 100" />
      <text x="18" y="20.35" class="js-result-message js-english-message-result">${message}</text>
      </svg>
    </div>

    <div class="js-feedback-time-con" style="text-align:center;margin-bottom: 30px">
    <span class="js-feedback-time" style="font-size:1.15em;color: #5a5a5a;">مدة الإنهاء: ${state.testTime}</span>
    </div>
    <div class="js-article-text" style="margin-bottom: 52px">
      <div class="container">
        <h5>لمعرفة التفسير والتفاصيل للأخطاء الشائعة باللغة العربية كي تتجنبها
        <a href="https://lookinmena.com/%d8%a7%d9%84%d8%a3%d8%ae%d8%b7%d8%a7%d8%a1-%d8%a7%d9%84%d8%b4%d8%a7%d8%a6%d8%b9%d8%a9-%d8%a8%d8%a7%d9%84%d9%84%d8%ba%d8%a9-%d8%a7%d9%84%d8%b9%d8%b1%d8%a8%d9%8a%d8%a9/" target="_blank">اضغط هنا</a></h5>
      </div>
    </div>
    <div class="js-feedback-summary-con">
      <div class="container">
        <div class="js-feedback-box" style="direction: rtl;
        text-align: right">
          <img class="js-feedback-img" src="../wp-content/themes/lookinmena/assets/images/test-grants2.svg" alt="Nasooh lookinmena mascot">
          <h5 class="js-feedback-summary-header">نصيحة العم نصوح: </h5>
          <div class="js-feedback-summary-list" style="padding: 20px 30px">${feedbackSummary}
          </div>
        </div>
        <br>
     </div>
    </div>
    <div class="js-wrong-questions" style="text-align:center">
      <div class="container">
        <!-- panel -->
        <div class="panel-group" id="accordion-2">
            <div class="panel" style="background: transparent">
              <div class="panel-heading" style="width: 275px;
              margin: 0 auto;position: relative;
              bottom: -20px;
              z-index: 999;">
                <h4 class="panel-title"> <a style="direction:rtl;    height: 45px;
                background: var(--medium-grey-color);color:white" data-toggle="collapse"
                    href="#collapse1"
                    class="collapsed" aria-expanded="false">عرض إجاباتك الخاطئة</a>
                </h4>
              </div>
              <div id="collapse1" class="panel-collapse collapse"
                aria-expanded="false">
                <div class="panel-body" style="background-color: #fff;
                box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.05);
                border-radius: 25px;">
                  <div class="js-wrong-questions-content"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>`
  $(".js-container").html(result);
}
// src="../wp-content/themes/lookinmena/assets/images/test-grants2.svg"
var renderMistakes = function () {
  let wrongQuestionsDOM = '';
  const pageQuestions = state.renderedWrongAnswersArr;
  pageQuestions.forEach((item, index) => {
    const formId = 'q-' + (index + 1);
    let singleQuestionDOM = `<form id="${formId}" class="js-q-box">` +
      "<div class=\"js-question-text\">" +
      "<h5>" +
      "<span class=\"js-q-text\">" + item.question + "</span></h5>" +
      "</div>" +
      "<div class=\"js-choices js-disabled-choices row\">" + item.choices +
      "</div>" +
      "</form>"
    wrongQuestionsDOM += singleQuestionDOM;
  });
  var questionsRender = `${wrongQuestionsDOM}`;
  $(".js-wrong-questions-content").html(questionsRender);
}
// 
// 
//event listeners

function handleMarksDisplay() {
  $(".main").on("click", ".btn-asses-submit", function (event) {
    event.preventDefault();
    var index = state.questionInfo.questionIndex;
    getQuestionDetails(index);
    renderQuestion(state)
  })
}


function handleStartQuiz() {
  $(".js-container").on("click", ".btn-asses-submit", function (event) {
    event.preventDefault();
    get_data();
    setStartEndTime('start');
    // var index = state.questionInfo.questionIndex;
    $('.home-container').fadeOut('medium', function () {
      // getQuestionDetails(index)
      getQuestionsDetails('pageQuestions');
      renderMainDetails(state);
      $('#bar1').barfiller();
      renderQuestion(state);
      $('.js-container').css("height", "auto");
      $([document.documentElement, document.body]).animate({
        scrollTop: 0
      }, 1000);
      $('.js-q-header').hide().fadeIn(300);
      $('.js-nav-box').css({ 'margin-top': '-30px', 'opacity': '0' }).animate(
        {
          marginTop: '-50px',
          opacity: 1
        }, 'normal'
      )
      $('.js-question-text').hide().fadeIn(500);
      $('.js-choices').hide().fadeIn(800).slideDown()
    })
  })
}

function handleSubmitAnswers() {
  $(".js-container").on("click", ".js-choice-submit-button", function (event) {
    $('.js-q-box').fadeOut('fast');
    // const numberOfQuestionsInPage = 10;
    const tenQuestionsArr = state.questionsData.slice(state.lastRenderedQuestion - 10, state.lastRenderedQuestion);

    for (let i = 1; i < tenQuestionsArr.length + 1; i++) {
      let formId = '#q-' + i;
      let serialized = $(formId).serialize();
      if (serialized === "choice=1") {
        changeTempMark(1)
      }
      else {
        let selectedChoiceId = $(formId + ' input[type=radio]:checked').attr('id');
        let wrongQuestionObj = tenQuestionsArr[i - 1];
        wrongQuestionObj.answers.forEach(choice => {
          if (choice.id === selectedChoiceId) {
            choice['isSelectedAns'] = true;
          }
          else {
            choice['isSelectedAns'] = false;
          }
        })
        addWrongAnswerObj(wrongQuestionObj)
      }
    }
    incrementTotalMark();
    getQuestionsDetails('pageQuestions');
    renderQuestion(state);
    computePercentage();

    $('.fill').attr("data-percentage", state.percCompletion);
    $('.fill').css("width", state.percCompletion + "%");
    zeroTempMark();
    $('.js-question-text').hide().fadeIn(200);
    $('.js-choices').hide().fadeIn(400).slideDown();
    if (state.lastRenderedQuestion !== 60) {
      $([document.documentElement, document.body]).animate({
        scrollTop: $("#questions-form").offset().top
      }, 1000);
    }
    else {
      $('.js-container').css("height", "420px");
      window.scrollTo(0, 0);
    }
  })
}

function handleChoiceCheck() {
  $('.js-container').on('change', 'input', function () {
    if (!$('.js-choices:not(:has(:radio:checked))').length) {
      choicesCheck(true);
    }
    renderCheck();
    choicesCheck(false);
  });
}

function handleViewResult() {
  $(".js-container").on("click", ".js-view-result", function (event) {
    setStartEndTime('end');
    setTestTime();
    $('.js-question-page').fadeOut('slow', function () {
      generateFeedbackSummary();
      renderResult();
      // $('#steps').progressbar({ steps: setResultStep() });
      getQuestionsDetails('wrongQuestions');
      renderMistakes();
      animateResult();
    })

  })
}

// function setResultStep() {
//   let levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
//   let resultLevel = state.result;
//   levels.forEach((level, index) => {
//     if (level === resultLevel) {
//       levels[index] = '@' + level
//     }
//   });
//   return levels
// }

function handleProgressBar() {
  (function ($) {

    $.fn.barfiller = function (options) {

      var defaults = $.extend({
        barColor: '#006699',
        tooltip: false,
        duration: 1000,
        animateOnResize: false,
        symbol: "%"
      }, options);


      /******************************
      Private Variables
      *******************************/

      var object = $(this);
      var settings = $.extend(defaults, options);
      var barWidth = object.width();
      var fill = object.find('.fill');
      var toolTip = object.find('.tip');
      var fillPercentage = fill.attr('data-percentage');
      var resizeTimeout;
      var transitionSupport = false;
      var transitionPrefix;

      /******************************
      Public Methods
      *******************************/

      var methods = {

        init: function () {
          return this.each(function () {
            if (methods.getTransitionSupport()) {
              transitionSupport = true;
              transitionPrefix = methods.getTransitionPrefix();
            }

            methods.appendHTML();
            methods.setEventHandlers();
            methods.initializeItems();
          });
        },

        /******************************
        Append HTML
        *******************************/

        appendHTML: function () {
          fill.css('background', settings.barColor);

          if (!settings.tooltip) {
            toolTip.css('display', 'none');
          }
          toolTip.text(fillPercentage + settings.symbol);
        },


        /******************************
        Set Event Handlers
        *******************************/
        setEventHandlers: function () {
          if (settings.animateOnResize) {
            $(window).on("resize", function (event) {
              clearTimeout(resizeTimeout);
              resizeTimeout = setTimeout(function () {
                methods.refill();
              }, 300);
            });
          }
        },

        /******************************
        Initialize
        *******************************/

        initializeItems: function () {
          var pctWidth = methods.calculateFill(fillPercentage);
          object.find('.tipWrap').css({ display: 'inline' });

          if (transitionSupport)
            methods.transitionFill(pctWidth);
          else
            methods.animateFill(pctWidth);
        },

        getTransitionSupport: function () {

          var thisBody = document.body || document.documentElement,
            thisStyle = thisBody.style;
          var support = thisStyle.transition !== undefined || thisStyle.WebkitTransition !== undefined || thisStyle.MozTransition !== undefined || thisStyle.MsTransition !== undefined || thisStyle.OTransition !== undefined;
          return support;
        },

        getTransitionPrefix: function () {
          if (/mozilla/.test(navigator.userAgent.toLowerCase()) && !/webkit/.test(navigator.userAgent.toLowerCase())) {
            return '-moz-transition';
          }
          if (/webkit/.test(navigator.userAgent.toLowerCase())) {
            return '-webkit-transition';
          }
          if (/opera/.test(navigator.userAgent.toLowerCase())) {
            return '-o-transition';
          }
          if (/msie/.test(navigator.userAgent.toLowerCase())) {
            return '-ms-transition';
          }
          else {
            return 'transition';
          }
        },

        getTransition: function (val, time, type) {

          var CSSObj;
          if (type === 'width') {
            CSSObj = { width: val };
          }
          else if (type === 'left') {
            CSSObj = { left: val };
          }

          time = time / 1000;
          CSSObj[transitionPrefix] = type + ' ' + time + 's ease-in-out';
          return CSSObj;

        },

        refill: function () {
          fill.css('width', 0);
          toolTip.css('left', 0);
          barWidth = object.width();
          methods.initializeItems();
        },

        calculateFill: function (percentage) {
          percentage = percentage * 0.01;
          var finalWidth = barWidth * percentage;
          return finalWidth;
        },

        transitionFill: function (barWidth) {

          var toolTipOffset = barWidth - toolTip.width();
          fill.css(methods.getTransition(barWidth, settings.duration, 'width'));
          toolTip.css(methods.getTransition(toolTipOffset, settings.duration, 'left'));

        },

        animateFill: function (barWidth) {
          var toolTipOffset = barWidth - toolTip.width();
          fill.stop().animate({ width: '+=' + barWidth }, settings.duration);
          toolTip.stop().animate({ left: '+=' + toolTipOffset }, settings.duration);
        }

      };

      if (methods[options]) { 	// $("#element").pluginName('methodName', 'arg1', 'arg2');
        return methods[options].apply(this, Array.prototype.slice.call(arguments, 1));
      } else if (typeof options === 'object' || !options) { 	// $("#element").pluginName({ option: 1, option:2 });
        return methods.init.apply(this);
      } else {
        $.error('Method "' + method + '" does not exist in barfiller plugin!');
      }
    };

  })(jQuery);
}


// function handleViewResult() {
//   $(".js-container").on("click", ".js-view-result", function (event) {
//     $('.js-question-page').fadeOut('slow', function () {
//       renderResult();
//       animateResult();
//     })

//   })
// }

function animateResult() {
  $(".js-feedback-header").hide()
  $(".result-ring").hide();
  $(".js-feedback-summary-con").hide();
  $(".js-feedback-img").hide();
  $(".js-feedback-time-con").hide();
  $(".js-feedback-summary-header").hide();
  $(".js-feedback-summary-list").hide();
  $(".js-article-text").hide();
  $("#steps").hide();
  $("#result-level-text").hide();
  $(".js-wrong-questions").hide();
  $(".js-container").animate({
    height: '300px'
  })
  $(".js-feedback-header").fadeIn(800).slideDown();
  setTimeout(() => {
    $(".result-ring").fadeIn(800);

  }, 500);
  setTimeout(() => {
    $(".js-container").animate({
      height: '700px'
    }, 2000, function () {
      $(".js-container").css("height", "auto");
    });
    $("#result-level-text").fadeIn(1000);
    $("#steps").fadeIn(1200);
    $(".js-feedback-time-con").fadeIn(2000);
    $(".js-article-text").fadeIn(2200);
    $(".js-feedback-summary-con").fadeIn(1000).slideDown(2000, function () {
      $(".js-feedback-img").fadeIn(200, function () {
        $(".js-feedback-summary-header").fadeIn(200, function () {
          $(".js-feedback-summary-list").fadeIn(500).slideDown(500);
          $(".js-wrong-questions").fadeIn(600);
        });

      });

    });

  }, 2000);
}

//other functions

// function getQuestionDetails(index) {
//   const requiredQuestion = state.questionsData[index];
//   const requiredQuestionAnswers = requiredQuestion.answers;
//   const requiredQuestionTitle = requiredQuestion.question.title
//   const requiredChoices = generateQuestionAnswersDOM(requiredQuestionAnswers);
//   const total = state.questionsData.length;
//   addNumberOfQuestions(state, total)
//   addQuestion(state, requiredQuestionTitle, requiredChoices);
// }

function getQuestionsDetails(reqStateProp) {
  let requiredStateProp = reqStateProp;
  let questionsArr = [];
  if (reqStateProp === 'pageQuestions') {
    questionsArr = state.questionsData.slice(state.lastRenderedQuestion, state.lastRenderedQuestion + 10);
  }
  else {
    questionsArr = state.wrongAnswersArr;
  }
  questionsArr.forEach((question, index) => {
    const requiredQuestion = question;
    const requiredQuestionAnswers = requiredQuestion.answers;
    const requiredQuestionTitle = requiredQuestion.question.title;
    const requiredQuestionNumber = index + 1 + state.lastRenderedQuestion;
    const requiredChoices = generateQuestionAnswersDOM(requiredQuestionAnswers, requiredStateProp);
    addQuestion(state, requiredQuestionTitle, requiredChoices, requiredQuestionNumber, requiredStateProp)
  })
  incrementLastRenderedQuestion();
}

function generateFeedbackSummary() {
  let feedbackText = '';
  feedbackText = `<p>من الأمور المغفَلة في التواصل الفعّال هو ارتباط المعنى بالمبنى؛ إذ إن البناء اللغوي الخاطئ للجمل والتراكيب يؤدي إلى إيصال معنى خاطئ، ومن هنا تأتي الحاجة ملحّة لإتقان لغتنا العربية من جوانبها النحوية والإملائية، وقد تكون لستَ عاملًا في المجال الأدبي أو إعداد المحتوى مثلًا لتكون مجبرًا على الكتابة بلغة سليمة تخاطب فيها جمهورك، لكنك بالطبع قارئ؛ والقراءة هنا لا تشير إلى الكتب فقط، فأنت طالب بحاجة لفهم محاضراته وأنت متابع لمدونات وصفحات عديدة على منصات التواصل الاجتماعي بحاجة للفهم الصحيح لما يمرُّ أمامك؛ مثل هذا النص تمامًا، وإن من الصور النمطية التي شيعت عن اللغة العربية بأنها معقدة وجامدة وبعيدة عن عامة الناس وذلك خاطئ تمامًا؛ إذ يمكنك عزيزي الكتابة بلغة سليمة دون إدراج أبيات من الشعر الجاهلي!
    </p>`
  addFeedbackSummary(feedbackText);
}

function generateQuestionAnswersDOM(answersArray, requiredStateProp) {
  let answersDOMArray = [];
  let labelClass = '';
  let ansHeight = '50px'
  if (requiredStateProp === 'pageQuestions') {
    labelClass = 'js-enabled-choice'
  }
  else {
    labelClass = 'js-disabled-choice'
  }
  answersArray.forEach(answer => {
    if (answer.title.length > 23) {
      ansHeight = '75px'
    }
    else if (answer.title.length > 27) {
      ansHeight = '80px'
    }
    else if (answer.title.length > 33) {
      ansHeight = '110px'
    }
  })
  answersArray.forEach(answer => {
    let colSize = '';
    if (answersArray.length === 4) {
      colSize = 'col-md-3'
    }
    else if (answersArray.length === 3) {
      colSize = 'col-md-4'
    }
    else if (answersArray.length === 2) {
      colSize = 'col-md-6'
    }
    let answerHTML = `<div class="${colSize} col-sm-12">
    <div class="js-choice ${labelClass}" style="height: ${ansHeight}">
      <input class="js-radio-choice" type="radio" name="choice" id="${answer.id}" value="${answer.isRight}">
      <label class="${(requiredStateProp === 'wrongQuestions' && answer.isRight === '1') ? 'js-right-choice' : ''}
      ${(requiredStateProp === 'wrongQuestions' && answer.isSelectedAns === true) ? 'js-wrong-choice' : ''}
      " for="${answer.id}">
       ${answer.title}</label>
    </div>
    </div>
    `
    answersDOMArray.push(answerHTML);
  });
  let joinedAnswers = answersDOMArray.join('');
  return joinedAnswers
}

function addQuestionToQuestionsArray(index, reqQuestionTxt, reqQuestionChoices) {
  questionText.splice(index, 0, reqQuestionTxt);
  questionChoices.splice(index, 0, reqQuestionChoices);
}

// Questions Repo
function get_data() {
  var data = JSON.parse(globalData);
  state.questionsData = data;
  const total = state.questionsData.length;
  addNumberOfQuestions(state, total)
}

//handlers
$(function () {
  handleStartQuiz();
  handleChoiceCheck();
  handleSubmitAnswers();
  handleViewResult();
  handleProgressBar();
})

