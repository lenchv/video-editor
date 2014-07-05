document.onmousemove = moveTip;
function moveTip(e) {
  floatTipStyle = document.getElementById("floatTip").style;
  w = 250; // ������ ���������
  x = e.pageX; // ���������� X �������
  y = e.pageY; // ���������� Y �������
  // ���������� ���� ������ �� ������� 
  if ((x + w + 10) < document.body.clientWidth) { 
    floatTipStyle.left = x + 'px';
  // ���������� ���� ����� �� �������
  } else { 
    floatTipStyle.left = x - w + 'px';
  }
  // ��������� ��  �������� ���� ���� ��������
  floatTipStyle.top = y + 20 + 'px';
}

function toolTip(msg) {
  event.stopPropagation();
  floatTipStyle = document.getElementById("floatTip").style;
  if (msg) {
    // ������� ����� ���������
    document.getElementById("floatTip").innerHTML = msg;
    // ���������� ���������
    floatTipStyle.display = "block";
  } else { 
    // ������ ���������
    floatTipStyle.display = "none";
  } 
}