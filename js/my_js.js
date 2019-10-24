// JavaScript Document

$(".button-collapse").sideNav();

$(".slider").slider();


$(document).ready(function()
{
	createQuizLayout();
	initQuiz();
	
	
});

function createQuizLayout()
{
	//declare arrays of the numbers both english and french
	var eng_nums = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];
	var fre_nums = ["Un", "Deux", "Trois", "Quatre", "Cinq", "Six", "Sept", "Huit", "Neuf", "Dix"];
	
	var arrEng_nums = [];
	for(var i=0; i<eng_nums.length; i++)
	{
		arrEng_nums.push('<li data-index="' + (i+1) + '">' + eng_nums[i] +'</li>');
	}

	var arrFre_nums = [];
	for(var i=0; i<fre_nums.length; i++)
	{
		arrFre_nums.push('<li data-index="' + (i+1) + '">' + fre_nums[i] +'</li>');
	}

	//shuffle the arrays to give a randomized result
	arrEng_nums = shuffle(arrEng_nums);
	arrFre_nums = shuffle(arrFre_nums);

    // After the arrays are finished they are then inserted into DOM
	$('#source').html(arrEng_nums.join(''));
	$('#target').html(arrFre_nums.join(''));
}

	





function initQuiz()
{
	$('#source li').draggable(
	{
		revert : true,
		revertDuration: 200,
		cursor: "move"
	});
	
	
var totalScore = 0;
	$('#score').text(totalScore + ' points.');	
	$('#target li').droppable(
	{
	  accept : function(draggable)
	  {
		if(parseInt(draggable.data('index'), 10) === parseInt($(this).data('index'), 10))
		{
			return true;
		}
		else 
		{
			return false;
		}
	  },
	  
	  drop: function( event, ui ) 
	  {
	  	var that = $(this);
		that.addClass( "ui-state-highlight" ).html( 'Correct!' ).effect('bounce');
		that.droppable('disable');

		ui.draggable.addClass('correct ui-state-error');
		(ui.draggable).draggable('disable');

		totalScore++;
		$('#score').text(totalScore + ' points.');

		if($('li.correct').length === 10)
		{
			$( "#dialog-complete" ).dialog({
				  resizable: false,
				  modal: true
				});
		}

	  }
	});		
	
	
}




function shuffle(o)
{
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}