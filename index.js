$(function (){
  notationForm = 0;

  block = 0;
  blockPS = 0;
  blockPC = 1;

  function notation(num, dim) {
    if (notationForm == 0) {
      if (num <= 1) {
        return num.toFixed(dim);
      } else {
        notationLevel = Math.floor(Math.log10(num)/3);
        notationSpace = Math.floor(Math.log10(num)%3);
        notationFixed = (num / 1000 ** notationLevel).toFixed(Math.max(dim-notationSpace, 0)) ;
        if (notationLevel < 11) {
          return notationFixed + standardNotation[notationLevel];
        } else {
          return notationFixed + standardNotation2[(notationLevel-11) % 10] + standardNotation3[Math.floor((notationLevel-11) / 10)];
        }
      }
    } else {
      if (num >= 1e5) {
        return (num/(10**(Math.floor(Math.log10(num))))).toFixed(3) + 'e' + Math.floor(Math.log10(num));
      } else {
        return num.toFixed(2);
      }
    }
  }

  function displayBlock() {
    $('#blockCount').html(function (index,html) {
      return notation(block);
    });
  }

  $(document).on('click','#blockClick',function() {
    block += blockPC;
    displayBlock();
  });
});
