//state object
var state = {
  totalQuestions: 0,
  questionPage: {
    question: "",
    choices: "",
    feedbacks: {},
    queNumber: 1,
    questionIndex: 0,
  },
  checked: false,
  feedbackMsg: "",
  feedbackSummary: [],
  feedbackType: "",
  totalMarks: 0,
  tempMark: 0
}

//state modification functions
var addQuestion = function (state, requiredQuestion, requiredChoices, requiredFeedbacks) {
  state.questionPage.question = requiredQuestion;
  state.questionPage.choices = requiredChoices;
  state.questionPage.feedbacks = requiredFeedbacks;
}

var addFeedback = function () {
  state.feedbackSummary.indexOf(state.feedbackMsg) === -1 ? state.feedbackSummary.push(state.feedbackMsg) : console.log("");
}

var addNumberOfQuestions = function (state, total) {
  state.totalQuestions = total;
}

var choiceCheck = function () {
  state.checked = true;
}

var choiceUncheck = function () {
  state.checked = false;
}

var changeTempMark = function (mark) {
  state.tempMark = mark
}

var zeroTempMark = function () {
  state.tempMark = 0
}

var changeFeedback = function (feedbackKey) {
  state.feedbackMsg = state.questionPage.feedbacks[feedbackKey];
  state.feedbackType = feedbackKey;

}

var answerCheckFalse = function () {
  state.answerValue = false;
}

var incrementCorrectAnsCount = function () {
  state.questionPage.correctAns += 1;
}

var incrementpositiveAnsCount = function () {
  state.questionPage.positiveAns += 1;
}

var incrementQueNumberCount = function () {
  state.questionPage.queNumber += 1;
}

var incrementQuestionIndexCount = function () {
  state.questionPage.questionIndex += 1;
}

var incrementTotalMark = function () {
  state.totalMarks += state.tempMark
}
//Render functions

var renderQuestion = function (state) {
  var checkLastAnswer = function () {
    if (state.questionPage.questionIndex === state.totalQuestions - 1) {
      return `<button ${state.checked ? "" : "disabled"} class=\"js-choice-submit-button js-view-result\">اظهار النتيجة</button>`
    }
    else {
      return `<button ${state.checked ? "" : "disabled"} class=\"js-choice-submit-button\">التالي</button>`
    }
  }
  var questionRender = "<div class=\"js-question-page\">" +
    "<h2 class=\"js-q-header\">اختبار الحصول على المنحة</h2>" +
    "<div class=\"js-q-box\">" +
    "<div class=\"js-question-text\">" +
    "<h5><span class=\"js-q-number\">" + state.questionPage.queNumber + "</span>" +
    "<span>/" + state.totalQuestions + ": </span><span class=\"js-q-text\">" + state.questionPage.question + "</span></h5>" +
    "</div>" +
    "<div class=\"js-choices\">" + state.questionPage.choices +
    "</div>" +
    "</div>" +
    "<div class=\"js-nav-box\">" +
    checkLastAnswer() +
    "</div>" +
    "</div>"
  $(".js-container").html(questionRender);

}

var renderFeedback = function () {
  var result = "";
  var feedbackMessage = state.feedbackMsg;

  result = "<div class=\"js-feedback-page\">" +
    "<h6 class=\"js-feedback-text\">" + feedbackMessage + "</h6>" +
    "<button" + checkLastAnswer() + "</button>" +
    "</div>";
  $(".js-container").html(result);
}

var renderCheck = function () {
  $(".js-nav-box").find("button").prop("disabled", state.checked ? false : true)
}

var renderResult = function () {
  var result = "";
  var totalMark = state.totalMarks;
  var message = "";
  var percentage = 0;
  var feedbackMessages = state.feedbackSummary.map(function (message) {
    return `<li class="js-feedback-message">${message}</li>
    `
  })
  var joinedArray = feedbackMessages.join("");

  if (totalMark >= 85 && totalMark <= 100) {
    message = "ممتازة";
    ringColor = "js-excellent-result";
    percentage = 100
  }
  else if (totalMark >= 70 && totalMark < 85) {
    message = "جيدة جدا";
    ringColor = "js-verygood-result"
    percentage = 80
  }
  else if (totalMark >= 60 && totalMark < 70) {
    message = "جيدة";
    ringColor = "js-good-result"
    percentage = 60
  }
  else if (totalMark >= 50 && totalMark < 60) {
    message = "متوسطة";
    ringColor = "js-average-result"
    percentage = 40
  }
  else if (totalMark < 50 && totalMark >= 0) {
    message = "ضعيفة";
    ringColor = "js-weak-result"
    percentage = 20
  }

  result = "<div class=\"js-result-page\">" +
    "<div class=\"js-feedback-text-con\">" +
    "<span class=\"js-feedback-header\">نسبة الحصول: </span>" +
    `<div>
      <svg viewBox="0 0 36 36" class="result-ring ${ringColor}">
      <path class="ring-bg" d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831" />
      <path class="ring" d="M18 2.0845
      a 15.9155 15.9155 0 0 1 0 31.831
      a 15.9155 15.9155 0 0 1 0 -31.831" ; stroke-dasharray="${percentage}, 100" />
      <text x="18" y="20.35" class="js-result-message">${message}</text>
      </svg>
    </div>` +
    "</div> " +
    "<div class=\"js-feedback-summary-con\">" +
    "<div class=\"container\">" +
    "<div class=\"js-feedback-box\">" +
    "<img class=\"js-feedback-img\" src=\"../wp-content/themes/lookinmena/assets/images/test-grants2.svg\" alt=\"Nasooh lookinmena mascot\">" +
    "<h5 class=\"js-feedback-summary-header\">نصائح العم نصوح: </h5>" +
    "<ul class=\"js-feedback-summary-list\">" + joinedArray +
    "</ul>" +
    "</div>" +
    "<br>" +
    "</div>"
    ;
  $(".js-container").html(result);
}
//event listeners

function handleMarksDisplay() {
  $(".main").on("click", ".btn-asses-submit", function (event) {
    event.preventDefault();
    var index = state.questionPage.questionIndex;

    getQuestionDetails(index);
    renderQuestion(state)
  })
}

function handleStartQuiz() {
  $(".js-container").on("click", ".btn-asses-submit", function (event) {
    event.preventDefault();
    var index = state.questionPage.questionIndex;
    $('.home-container').fadeOut('medium', function () {
      getQuestionDetails(index);
      renderQuestion(state);
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

function handleNext() {
  $(".js-container").on("click", ".js-next-question", function (event) {
    var index = state.questionPage.questionIndex;
    getQuestionDetails(index);
    renderQuestion(state);
  })
}

function handleSubmitAnswer() {
  $(".js-container").on("click", ".js-choice-submit-button", function (event) {
    $('.js-q-box').fadeOut('fast')

    incrementQueNumberCount();
    incrementQuestionIndexCount();
    incrementTotalMark();
    var index = state.questionPage.questionIndex;

    if (state.feedbackType === 'positive' && index === 6) {

      const questionText = "ما هو دورك في هذا العمل التطوعي؟";
      const questionChoices =
        `<form>
      <div class="js-choice">
      <input class="js-radio-choice" type="radio" name="choice" data-value="def" id="q-a" value="3"><br>
      <label for="q-a">مدير فريق/مؤسس</label>
      </div>
      <div class="js-choice">
      <input class="js-radio-choice" type="radio" name="choice" data-value="def" id="q-b" value="1"><br>
      <label for="q-b">عضو عادي</label>
      </div>
      </form>`;
      const questionFeedbacks =
      {
        def: null,
      }
      addQuestionToQuestionsArray(index, questionText, questionChoices, questionFeedbacks);
      getQuestionDetails(index);
    }
    else {
      getQuestionDetails(index);
    }
    if (index !== state.totalQuestions) {
      renderQuestion(state);
    }
    if (state.feedbackMsg !== null) {
      addFeedback();
    }
    zeroTempMark();

    if (sessionStorage.getItem('radioOpened') === true) {
      $(".js-container").animate({ height: '400px' });
      $('.js-nav-box').animate(
        {
          marginTop: '-50px',
        }
      )
    }

    $('.js-question-text').hide().fadeIn(200);
    $('.js-choices').hide().fadeIn(400).slideDown()
  })
}

function handleChoiceCheck() {
  $(".js-container").on("click", "input[type=radio]", function (event) {
    var elementName = $(this).attr('data-value');
    var value = Number($(this).val());
    changeFeedback(elementName);
    changeTempMark(value);
    choiceCheck();
    renderCheck();
    choiceUncheck();

  })
}

function handleChoiceCheckCheckbox() {
  $(".js-container").on("change", "input[type=checkbox]", function (event) {
    var isChecked = $(this).prop('checked')
    var checkBoxes = $(".js-yes-radiobutton-container input[type=checkbox]:checked")
    if (isChecked == true) {
      choiceCheck();
      renderCheck();
      choiceUncheck();
    }
    else {
      if ($(checkBoxes).length === 0) {
        choiceUncheck();
        renderCheck();
        changeTempMark(0);
      }
    }
    if ($(checkBoxes).length === 1) {
      changeTempMark(5);
    }
    else if ($(checkBoxes).length === 2 || $(checkBoxes).length === 3) {
      changeTempMark(10);
    }
  })
}

function handleRadioYesShow() {
  $(".js-container").on("change", ".yes-radiobutton", function () {
    var checkBoxes = $(".js-yes-radiobutton-container input[type=checkbox]")
    $(checkBoxes).prop('checked', false);
    $("#showItems").show();
    renderCheck();
    choiceUncheck();
    sessionStorage.setItem('radioOpened', true)
    $('.js-nav-box').animate(
      {
        marginTop: '0px',
      }
    )
    $(".js-container").animate({ height: '450px' });
    $('.js-yes-radiobutton-container').hide().fadeIn('fast')
  })
}

function handleRadioYesHide() {
  $(".js-container").on("change", ".no-radiobutton", function () {
    sessionStorage.removeItem('radioOpened')
    $(".js-container").animate({ height: '400px' });
    $('.js-nav-box').animate(
      {
        marginTop: '-50px',
      }
    )
    $(".js-yes-radiobutton-container").fadeOut(100);
  })
}

function handleViewResult() {
  $(".js-container").on("click", ".js-view-result", function (event) {
    $('.js-question-page').fadeOut('slow', function () {
      renderResult();
      animateResult();
    })

  })
}

function animateResult() {
  $(".js-feedback-header").hide()
  $(".result-ring").hide();
  $(".js-feedback-summary-con").hide();
  $(".js-feedback-img").hide();
  $(".js-feedback-summary-header").hide();
  $(".js-feedback-summary-list").hide();
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
    $(".js-feedback-summary-con").fadeIn(500).slideDown(1000, function () {
      $(".js-feedback-img").fadeIn(200, function () {
        $(".js-feedback-summary-header").fadeIn(200, function () {
          $(".js-feedback-summary-list").fadeIn(500).slideDown(500)
        });

      });

    });


  }, 2000);
}

//other functions

// var questionsMap = new Map();
// questionsMap.set(1, {
//   questionText:"",
//   questionChoices: "",
//   questionFeedbacks:""
// })

function getQuestionDetails(index) {
  var requiredQuestion = questionText[index];
  var requiredFeedbacks = questionFeedbacks[index];
  var requiredChoices = questionChoices[index];
  var total = questionText.length;
  addNumberOfQuestions(state, total)
  addQuestion(state, requiredQuestion, requiredChoices, requiredFeedbacks);
}

function addQuestionToQuestionsArray(index, reqQuestionTxt, reqQuestionChoices, reqQuestionFeedbacks) {
  questionText.splice(index, 0, reqQuestionTxt);
  questionChoices.splice(index, 0, reqQuestionChoices);
  questionFeedbacks.splice(index, 0, reqQuestionFeedbacks);
}



// Questions Repo

var questionText = ["ما هي آخر شهادة حصلت عليها؟",
  "ما هو معدلك بآخر شهادة (كنسبة مئوية)؟",
  "هل لديك نشرة علمية بمجلة عالمية؟",
  "هل تملك إثبات شهادة لغة؟",
  "هل تملك جواز سفر ساري الصلاحية؟",
  "هل تملك خبرة بالعمل التطوعي؟",
  "هل تملك خبرة بسوق العمل؟",
  "هل تملك رسائل توصية Recommendation Letters؟",
  "هل تملك سيرة ذاتية مكتوبة CV - Resume؟",
  "هل تملك رسالة دافع مكتوبة Motivation/Cover Letter؟",
];
var questionChoices = [//first Q
  `<form>
<div class="js-choice">
<input class="js-radio-choice" type="radio" name="choice" data-value="def" id="q1-a" value="0"><br>
<label for="q1-a">بكالوريا (ثانوية)</label>
</div>
<div class="js-choice">
<input class="js-radio-choice" type="radio" name="choice" data-value="def" id="q1-b" value="0"><br>
<label for="q1-b"> بكالوريوس</label>
</div>
<div class="js-choice">
<input class="js-radio-choice" type="radio" name="choice" data-value="def" id="q1-c" value="0"><br>
<label for="q1-c"> ماجستير</label>
</div>
<div class="js-choice">
<input class="js-radio-choice" type="radio" name="choice" data-value="def" id="q1-d" value="0"><br>
<label for="q1-d"> دكتوراه</label>
</div>
</form>`,
  //second Q
  `<form>
<div class="js-choice">
<input class="js-radio-choice" type="radio" name="choice" data-value="def" id="q2-a" value="8"><br>
<label for="q2-a">من ٦٠-٧٠٪</label>
</div>
<div class="js-choice">
<input class="js-radio-choice" type="radio" name="choice" data-value="def" id="q2-b" value="13"><br>
<label for="q2-b">من ٧٠-٨٠٪</label>
</div>
<div class="js-choice">
<input class="js-radio-choice" type="radio" name="choice" data-value="def" id="q2-c" value="22"><br>
<label for="q2-c">من ٨٠-٩٠٪</label>
</div>
<div class="js-choice">
<input class="js-radio-choice" type="radio" name="choice" data-value="def" id="q2-d" value="28"><br>
<label for="q2-d"> من ٩٠-١٠٠٪</label>
</div>
</form>`,
  // added question
  `<form>
<div class="js-choice">
<input class="js-radio-choice" type="radio" name="choice" data-value="positive" id="q-a" value="5"><br>
<label for="q-a">نعم</label>
</div>
<div class="js-choice">
<input class="js-radio-choice" type="radio" name="choice" data-value="negative" id="q-b" value="0"><br>
<label for="q-b">لا</label>
</div>
</form>`,
  //third Q
  `<form>
<div class="js-choice">
<input class="js-radio-choice" type="radio" name="choice" data-value="positive" id="q3-a" value="10"><br>
<label for="q3-a">نعم أملك IELTS</label>
</div>
<div class="js-choice">
<input class="js-radio-choice" type="radio" name="choice" data-value="positive" id="q3-b" value="10"><br>
<label for="q3-b">نعم أملك TOEFL</label>
</div>
<div class="js-choice">
<input class="js-radio-choice" type="radio" name="choice" data-value="positive" id="q3-c" value="10"><br>
<label for="q3-c">نعم أملك أحد هذه اللغات DELE - DALF </label>
</div>
<div class="js-choice">
<input class="js-radio-choice" type="radio" name="choice" data-value="negative" id="q3-d" value="0"><br>
<label for="q3-d">لا</label>
</div>
</form>`,
  //fourth Q
  `<form>
<div class="js-choice">
<input class="js-radio-choice" type="radio" name="choice" data-value="positive" id="q4-a" value="0"><br>
<label for="q4-a">نعم</label>
</div>
<div class="js-choice">
<input class="js-radio-choice" type="radio" name="choice" data-value="positive" id="q4-b" value="0"><br>
<label for="q4-b">لا</label>
</div>
</form>`,
  //fifth Q
  `<form>
<div class="js-choice">
<input class="js-radio-choice" type="radio" name="choice" data-value="positive" id="q6-a" value="4"><br>
<label for="q6-a">نعم، أكثر من ٦ أشهر </label>
</div>
<div class="js-choice">
<input class="js-radio-choice" type="radio" name="choice" data-value="positive" id="q6-b" value="2"><br>
<label for="q6-b">نعم، أقل من ٦ أشهر</label>
</div>
<div class="js-choice">
<input class="js-radio-choice" type="radio" name="choice" data-value="negative" id="q6-c" value="0"<br>
<label for="q6-c">لا</label>
</div>
</form>`,

  //sixth Q
  `<form>
<div class="js-choice">
<input class="js-radio-choice" type="radio" name="choice" data-value="positive" id="q5-a" value="10"><br>
<label for="q5-a">نعم، أكثر من ٦ أشهر </label>
</div>
<div class="js-choice">
<input class="js-radio-choice" type="radio" name="choice" data-value="positive" id="q5-b" value="4"><br>
<label for="q5-b">نعم، أقل من ٦ أشهر</label>
</div>
<div class="js-choice">
<input class="js-radio-choice" type="radio" name="choice" data-value="negative" id="q5-c" value="0"><br>
<label for="q5-c">لا</label>
</div>
</form>`,

  //seventh Q
  `<form>
  <div class="js-yes-radiobutton-wrapper">
  <div class="js-choice js-yes-radiobutton-input">
  <input class="js-radio-choice yes-radiobutton" type="radio" name="choice" data-value="def" id="q7-a" value="0">
  <label for="q7-a">نعم</label>
  </div>
  <div class="js-yes-radiobutton-container" id="showItems">
    <div class="js-choice">
    <input class="js-check-choice" type="checkbox" name="choice" id="q7-a-a"><br>
    <label for="q7-a-a">نعم, أكاديمية</label>
    </div>
    <div class="js-choice">
    <input class="js-check-choice" type="checkbox" name="choice" id="q7-a-b"><br>
    <label for="q7-a-b">نعم، مهنية</label>
    </div>
    <div class="js-choice">
    <input class="js-check-choice" type="checkbox" name="choice id="q7-a-c"><br>
    <label for="q7-a-c"> نعم, تطوعية</label>
    </div>
  </div>
  </div>
  <div class="js-choice">
  <input class="js-radio-choice no-radiobutton" type="radio" name="choice" data-value="negative" id="q7-b" value="0"><br>
  <label for="q7-b">لا</label>
  </div>
</div>
</form>`,
  //eigth Q
  `<form>
<div class="js-choice">
<input class="js-radio-choice" type="radio" name="choice" data-value="def" id="q8-a" value="10"><br>
<label for="q8-a"> نعم</label>
</div>
<div class="js-choice">
<input class="js-radio-choice" type="radio" name="choice" data-value="def" id="q8-b" value="0"><br>
<label for="q8-b">لا</label>
</div>
</form>`,
  //ninth Q
  `<form>
<div class="js-choice">
<input class="js-radio-choice" type="radio" name="choice" data-value="positive" id="q9-a" value="20"><br>
<label for="q9-a">نعم</label>
</div>
<div class="js-choice">
<input class="js-radio-choice" type="radio" name="choice" data-value="negative" id="q9-b" value="0"><br>
<label for="q9-b">لا</label>
</div>
</form>`,]
var questionFeedbacks = [
  // 1st ques
  { def: "تأكد أن المستندات الخاصة بآخر شهادة تكون مترجمة للغة التي ترغب بالتقديم عليها ومصدقة بشكل رسمي." },
  // 2nd ques
  { def: null },
  // added Q
  {
    positive: null,
    negative: null
  },
  // 3rd ques
  {
    positive: `تختلف المنح بالدرجة المطلوبة بشهادة اللغة, مثلا قد تطلب المنحة علامة 6 مثل منحة سعيد للتنمية واخرى 6.5 مثل منحة تشيفنينغ وايراسموس واخرى 7 متل منحة جامعة كامبريدج للدراسات العليا
  `,
    negative: `ننصحك صديقنا بالتقدم لإجراء اختبار اللغة, كون المنح تطلب اللغة وتعتبرها شرط اساسي لمباشرة الدراسة
  `
  },
  // 4th ques
  {
    positive: `يفضل أن يكون جواز السفر ساري المفعول لمدة لاتقل عن سنة`,
    negative: `ننصحك صديقنا بالحصول على جواز السفر كونه من الوثائق الاساسية للتقديم على اي منحة وللسفر لأي بلد 
  `
  },
  // 5th ques
  {
    positive: `ندعوك صديقنا للحصول على شهادات من المنظمات او المؤسسات التي عملت بها أو تطوعت بها تثبت ذلك كي تستطيع من ارفاقها في ملف التقديم
  `,
    negative: `إن العمل التطوعي معيار قوي يدل على نشاط المتقدم وينظر له بأهمية كبيرة، لذلك نقدم لك النصيحة بالتطوع بإحدى الجمعيات أو المبادرات المرخصة من حولك`
  },

  // 6th ques
  {
    positive: `تأكد من الحصول على شهادات خبرة تُثبت عملك مع توصية من مديرك المباشر، كي تستطيع ارفاقها في ملف التقديم`,
    negative: `الخبرة العملية معيار هام يؤخذ بعين الاعتبار عند التقديم للمنح، ننصح بالخوض في سوق العمل حتى لو كان تدريباً أو عملاً غير مأجور لاكتساب الخبرة`
  },
  // 7th ques
  {
    def: null,
    negative: `تُعتبر رسائل التوصية من أهم الامور التي تساهم في تقييم الطالب، ويجب ان تكون موقعة ومختومة بشكل رسمي من الجهة المقدمة لها إن كانت أكاديمية، مهنية أو تطوعية
  <a target="_blank" href="https://lookinmena.com/أهم-الخطوات-لكتابة-رسالة-توصية-recommendation-letter/">تعرف إلى أهم الخطوات للحصول على رسالة التوصية</a>`
  },
  // 8th ques
  {
    def: `ننصحك بالاهتمام بالسيرة الذاتية بشكل كبير، وأن يُذكر فيها جميع الأعمال والأنشطة والتدريبات التي شاركت بها، وأي إنجاز يقوم بإثرائها
  تعرف إلى <a href="https://lookinmena.com/أهم-الخطوات-لكتابة-سيرة-ذاتية-curriculum-vitae-cv-2/" target="_blank">أهم الخطوات لكتابة سيرتك الذاتية بشكل صحيح</a>`
  },
  // 9th ques
  {
    positive: `ننصحك صديقنا  بعرض رسالة الدافع على خبير لغة للتأكد من ضحتها قواعديا ولغويا
  كما ننصحك بالتأكد من عدم التشابه مع النماذج الموجودة على النت حيث هذه الامور تعتبر سرقة علمية وتضعف ملف المتقدم بإمكانك التأكد من ذلك عبر العديد من المواقع الموجودة اونلاين  مثل هذا <a href="https://www.quetext.com/" target="_blank">الموقع</a> في حال تم الكشف عن تكرار ننصحك بإعادة صياغة المحتوى`,
    negative: ` عليك بالاهتمام والعناية الكبيرة بكتابة رسالة الدافع، حيث تعتبر من اهم المعايير التي تعطي اهمية لملف المتقدم، كما ننصح بعدم نسخ اي من الرسائل المتوفرة على النت كونها تعتبر سرقة علمية 
  ويفضل ان تكون الرسالة مختومة بختم المؤسسة او الجامعة
  تعرف إلى <a href="https://lookinmena.com/%D8%B1%D8%B3%D8%A7%D9%84%D8%A9-%D8%AF%D9%88%D8%A7%D9%81%D8%B9-%D9%86%D8%A7%D8%AC%D8%AD%D8%A9-%D8%A8%D8%B9%D8%AF%D8%A9-%D8%AE%D8%B7%D9%88%D8%A7%D8%AA-motivation-lettter/" target="_blank">أهم الخطوات لكتابة رسالة الدافع
  </a>`}
]


//handlers
$(function () {
  handleStartQuiz();
  handleChoiceCheck();
  handleSubmitAnswer();
  handleNext();
  handleViewResult();
  // handleStartAgain();
  handleRadioYesShow();
  handleRadioYesHide();
  handleChoiceCheckCheckbox();
})