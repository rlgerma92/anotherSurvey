Survey.StylesManager.applyTheme("modern");

var json = {
  title: "CBDistillery 100k giveaway",
  showProgressBar: "bottom",
  goNextPageAutomatic: true,
  showNavigationButtons: true,
  pages: [
    {
      questions: [
        {
          type: "radiogroup",
          name: "interestReason",
          title:
            "Which of the following reasons is most relevant to why you are interested in CBD?",
          isRequired: true,
          choices: [
            "Reduce my anxiety or stress levels",
            "Improve my sleep",
            "Help with arthritis like pain",
            "Help with back or joint pain",
            "Other"
          ]
        },
        {
          type: "text",
          name: "otherInterestReason",
          title: "Please describe reason",
          visibleIf: "{interestReason}='Other'",
          isRequired: true
        }
      ]
    },
    {
      questions: [
        {
          type: "radiogroup",
          name: "productInterest",
          title: "Which of the following products are you most interested in?",
          isRequired: true,
          choices: [
            "CBD Oil",
            "CBD Softgels",
            "CBD Gummies",
            "CBD Topical products such as balm or stick",
            "CBD Vape products"
          ]
        }
      ]
    },
    {
      questions: [
        {
          type: "radiogroup",
          name: "hearOffer",
          title: "How did you hear about this free CBDistillery sample offer?",
          isRequired: true,
          choices: [
            "Word of mouth",
            "Social media",
            "Newspaper",
            "TV",
            "Online news",
            "Received an email offer",
            "Other"
          ]
        },
        {
          type: "text",
          name: "otherHearOffer",
          title: "Please tell us how you heard about this offer?",
          visibleIf: "{hearOffer}='Other'",
          isRequired: true
        }
      ]
    },
    {
      questions: [
        {
          type: "radiogroup",
          name: "gender",
          title: "Gender",
          isRequired: true,
          choices: ["Male", "Female"]
        },

        {
          type: "radiogroup",
          name: "askAge",
          title: "Age",
          isRequired: true,
          choices: [
            "18 to 24",
            "25 to 34",
            "35 to 44",
            "45 to 54",
            "55 to 64",
            "65+"
          ]
        },

        {
          type: "text",
          name: "zipCode",
          title: "Zip Code",
          isRequired: true
        }
      ]
    }
  ],
  showQuestionNumbers: "off"
};

window.survey = new Survey.Model(json);

survey.onComplete.add(function(result) {
  document.querySelector("#surveyResult").textContent =
    "Result JSON:\n" + JSON.stringify(result.data, null, 3);
});

ReactDOM.render(
  <Survey.Survey model={survey} />,
  document.getElementById("surveyElement")
);

function animate(animitionType, duration) {
  if (!duration) duration = 1000;
  var element = document.getElementById("surveyElement");
  $(element).velocity(animitionType, { duration: duration });
}

var doAnimantion = true;
survey.onCurrentPageChanging.add(function(sender, options) {
  if (!doAnimantion) return;
  options.allowChanging = false;
  setTimeout(function() {
    doAnimantion = false;
    sender.currentPage = options.newCurrentPage;
    doAnimantion = true;
  }, 500);
  animate("slideUp", 500);
});
survey.onCurrentPageChanged.add(function(sender) {
  animate("slideDown", 500);
});
survey.onCompleting.add(function(sender, options) {
  if (!doAnimantion) return;
  options.allowComplete = false;
  setTimeout(function() {
    doAnimantion = false;
    sender.doComplete();
    doAnimantion = true;
  }, 500);
  animate("slideUp", 500);
});
animate("slideDown", 1000);
