/*
  I just love JavaScript so much
*/

function updateData() {

  var new_data = [];
  for(var i = 0; i < self_eval_data.length; i++) {
    var new_value = self_eval_data[i];
    new_data.push(new_value);
  }

  var new_mgr_data = []
  for(var i = 0; i < mgr_eval_data.length; i++) {
    var new_value = mgr_eval_data[i];
    new_mgr_data.push(new_value);
  }

  data.datasets[0].data = new_data;
  data.datasets[1].data = new_mgr_data;
  radar_chart.update();

  if(window.history.replaceState) {
    try {
      window.history.replaceState({}, {}, location.origin+location.pathname+'?self_data='+new_data.join(',')+'&mgr_data='+new_mgr_data.join(','));
    } catch(err) {
      /* probably user is running this in a local file, which won't work */
    }
  }
}

var canvas = document.getElementById('radar-chart');
var gradient = canvas.getContext('2d').createLinearGradient(240, 0, 240, 320);
gradient.addColorStop(0, '#9be15d');
gradient.addColorStop(1, '#00e3ae');

var data = {
  labels: ['Hire Quality People',
            'Cultivate team culture',
            'Build diverse team',
            'Fire people',
            'Smooth onboarding',
            'Create focus',
            'Context on business',
            'Prioritize',
            'Set goals',
            'Employees set milestones',
            'Ask good questions',
            'Clarify expectations',
            'Real-time feedback',
            'Useful performance reviews',
            'Comp and title conversations',
            'Support skill development',
            'Recognize great work',
            'Don\'t do team\'s job',
            'Pro-actively manage team\'s work',
            'Build operating model',
            'Planning for contingencies'],
  datasets: [
    {
      label: 'My Ratings',
      data: [7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7],
      backgroundColor: "rgba(255, 122, 89,0.2)",
      borderColor: "rgba(255, 122, 89,1)",
      pointRadius: 0,
      lineCap: 'round',
      lineJoin: 'round'
    },
    {
      label: 'Manager Ratings',
      data: [7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7],
      backgroundColor: "rgba(94, 106, 184,0.2)",
      borderColor: "rgba(94, 106, 184,1)",
      pointRadius: 0,
      lineCap: 'round',
      lineJoin: 'round'
    }
  ]
};

var radar_chart = new Chart(canvas, {
  type: 'radar',
  data: data,
  fill: false,
  options: {
    responsive: true,
    animationSteps: 2,
    legend: {
      display: true,
      labels: {
        fontSize: 18,
        fontStyle: "300",
        fontColor: "#333",
        fontFamily: "'Work Sans',sans-serif",
        padding: 8
      }
    },
    tooltips: {
      enabled: false
    },
    scale: {
      ticks: {
        /* beginAtZero: true, */
        min: 0,
        suggestedMax: 6,
        stepSize: 1,
        display: false,
        fontFamily: "'Work Sans',sans-serif"
      },
      gridLines: {
        display: true,
        drawBorder: true,
        drawTicks: false
      },
      pointLabels: {
        fontSize: 12,
        fontStyle: "300",
        fontColor: "#333",
        fontFamily: "'Work Sans',sans-serif"
      }
    }
  }
});


document.getElementById('download').addEventListener('click', function(e) {
  canvas.toBlob(function(blob) {
    saveAs(blob, 'product-passion.png');
  });
});

var check_for_data;
var self_eval_data = [];
if(check_for_data = gup('self_data')) {
//   if(check_for_data.match(/^[1-8,]{11}$/) !== null) { //This should probably be a legit regex
    check_for_data = check_for_data.split(',');
    var length = check_for_data.length;
    for(var i = 0; i < length; i++) {
      var val = parseInt(check_for_data.shift());
      self_eval_data[i] = val;
    }

//   }
}

var check_for_mgr_data;
var mgr_eval_data = [];
if(check_for_mgr_data = gup('mgr_data')) {
//   if(check_for_data.match(/^[1-8,]{11}$/) !== null) { //This should probably be a legit regex
    check_for_mgr_data = check_for_mgr_data.split(',');
    var length = check_for_mgr_data.length;
    for(var i = 0; i < length; i++) {
      var val = parseInt(check_for_mgr_data.shift());
      mgr_eval_data[i] = val;
    }

//   }
}



updateData();
