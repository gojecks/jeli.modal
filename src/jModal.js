(function()
{
	/*ELI Modal Plugins
	can be injected to Project as a required Module

	@Function Type :  Object Prototype
	@Return Type : Object

		This Directive needs Jquery to Manipululate DOM
		Updated October 04,2015 20:31:10pm
	*/

	'use strict';

	var moduleName = 'jEli.Modal',
		module,
		_ = jEli.dom;

	try{
		module = jEli.jModule(moduleName);
	}catch(e)
	{
		jEli.jModule(moduleName,{});
	}

	module
	.jElement('jLoading',['modalFactory','$document',jLoadingDirectiveFn])
	.jElement('jModal',['modalFactory','$document',jModalDirectiveFn])
	.jElement('jTheatre',['modalFactory','$document',jTheatreDirectiveFn])
	.jElement('jTabPreview',['modalFactory','$document',jTabPreviewDirectiveFn])
	.jElement('jModalUi',jModalUiFn);

	//jTheatre Directive Fn
	function jTheatreDirectiveFn($mFactory,$document)
	{
		return ({
			template : theatreTemplate,
			$init : jTheatreInitFn
		});

		//theatreTemplate
		function theatreTemplate(ele,attr){
			//Append All modalFactory Object
				$mFactory.modalObjects.Tbody = _("<div></div>").attr("id", "projata-Tbody").addClass("clearfix");
				$mFactory.modalObjects.Twrap = _('<div></div>').attr("id", "projata-theatre");
				$mFactory.modalObjects.TButtonWrapper = _('<div id="projata-theatre-button"></div>');
	    		$mFactory.modalObjects.TBottomC = _('<div id="projata-BottomContainer"></div>').append($mFactory.modalObjects.TButtonWrapper);
	    		$mFactory.modalObjects.TMenu = _('<ul id="projata-Menu" theatre-menu-board></ul>'); //theatre-menu-board
	    		$mFactory.modalObjects.Tbutton = _('<a href="javascript:;" title="More Options" j-click="theatre.slideMenu($event)"> Options </a>');
	    		$mFactory.modalObjects.TButtonWrapper.append(
	    			$mFactory.modalObjects.TMenu,
	    			$mFactory.modalObjects.Tbutton
	    		);
	    		$mFactory.modalObjects.Tclose = _("<a id='projata-theatre-close' title='Close view' j-click='theatre.closeTheatre()'></a>").addClass("fa fa-times fa-2x");
				$mFactory.modalObjects.Timg = _('<div id="projata-theatre-img"></div>');
				$mFactory.modalObjects.Tcomment = _('<div id="projata-theatre-comment" class="" theatre-comment-main-board></div>'); //custom diretcive  theatre-comment-board
				$mFactory.modalObjects.TCDetails = _('<div id="projata-TCDetails" theatre-details-board></div>'); //custom directive  theatre-details-board
				$mFactory.modalObjects.TCBoard = _('<div id="projata-TCBoard" theatre-comment-board></div>');//custom directive  theatre-comment-board
				$mFactory.modalObjects.TCWriteBoard = _('<div id="projata-TCWriteBoard" theatre-write-board></div>');//custom directive  theatre-write-board
				$mFactory.modalObjects.Tbody.append(
				$mFactory.modalObjects.Tclose, 
				$mFactory.modalObjects.Timg,
				$mFactory.modalObjects.Tcomment.append(
					$mFactory.modalObjects.TCDetails,
					$mFactory.modalObjects.TCBoard,
					$mFactory.modalObjects.TCWriteBoard
				));
			$mFactory.modalObjects.Timg.append(
				$mFactory.modalObjects.TCimg = _('<div id="projata-TCimg"></div>'), 
				$mFactory.modalObjects.Thover = _('<div id="projata-hoverNav"></div>').append(
				$mFactory.modalObjects.Tright = _('<a href="javascript:;" id="projata-left" j-click="theatre.end()"><span class="fancy-ico" id="projata-left-ico"></span></a>'), 
				$mFactory.modalObjects.Tleft = _('<a href="javascript:;" id="projata-right" j-click="theatre.showNext()"><span class="fancy-ico" id="projata-right-ico"></span></a>')), 
				$mFactory.modalObjects.TImageData = _('<div id="projata-ImageData"></div>').append(
				$mFactory.modalObjects.TNumDisplay = _('<div id="projata-NumDisplay"></div>'), 
				$mFactory.modalObjects.TDetailsNav = _('<div id="projata-DetailsNav" class="border"></div>')), 
				$mFactory.modalObjects.TLightImage = _('<img id="projata-TBoxImage">')
			);
			
			$mFactory.modalObjects.Twrap
			.append($mFactory.modalObjects.Tbody,$mFactory.modalObjects.TBottomC);

			//append the object to the ele
				


			return $mFactory.modalObjects.Twrap[0];
		}

		function jTheatreInitFn(ele,attr,$model)
		{
			$mFactory.modalObjects.TDetailsNav.click(function() {});

			$model.theatre = $mFactory.theatre;
			$model.theatre.slideMenu = function($event)
			{
				$mFactory.modalObjects.TMenu.slideToggle("slow", function()
				{
	    			_(this).click(function() 
	    			{
	        			_(this).fadeOut()
	    			});
				});
			};

			$mFactory.$on('$extend.model',function(e,obj){
				if(obj && jEli.$isObject(obj)){
					for(var name in obj){
						$model[name] = obj[name];
					}
				}
			});

			$mFactory.$on('theatre.image.change',function(){
				delete $model.currentPreviewImage;
			});

			//remove cached data
			$mFactory.$on('theatre.ended',function(e,obj){
	            delete $model.currentPreviewImage;
	            delete $model.details;
	        });


			$mFactory.reformatContainer();
		}
	}

	//jModal Directive Fn
	function jModalDirectiveFn($mFactory,$document)
	{
		return {
			allowType : 'AE',
			template : function(ele,attr){

				$mFactory.modalObjects.wrap = _("<div></div>").attr("id", "projata-wrap"), 
				$mFactory.modalObjects.content = _("<div></div>").addClass("ui-corner-all").attr("id", "projata-content"), 
				$mFactory.modalObjects.overlay = _("<div></div>").attr("id", "projata-overlay"),
				$mFactory.modalObjects._temp = _("<div></div>").attr("id", "projata-temp"), 
				$mFactory.modalObjects.title = _("<div></div>").addClass("ui-dialog-titlebar " + "ui-widget-header " + "ui-helper-clearfix");
				$mFactory.modalObjects.titleBar = _("<span></span>").addClass("ui-dialog-title").appendTo($mFactory.modalObjects.title);
				$mFactory.modalObjects.close = _('<a j-click="$closeModal()"></a>').addClass("ui-dialog-titlebar-close " + "ui-corner-all " + "fa fa-times fa-lg").attr("role", "button").attr("id", "pojata-close").appendTo($mFactory.modalObjects.titleBar);
				$mFactory.modalObjects.outter = _("<div></div>").attr({"id":"projata-outter"}).appendTo($mFactory.modalObjects.wrap);
				$mFactory.modalObjects.outter.append($mFactory.modalObjects.content);

				//append the html content to ele
				var wrapper = _("<div></div>").append(
					$mFactory.modalObjects.wrap,
					$mFactory.modalObjects.overlay,
					$mFactory.modalObjects._temp
				);

				return wrapper[0];
			},
			$init : function(ele,attr,$model)
			{
				$model.$closeModal = $mFactory.$closejata;
				$mFactory.$on('cleanup',function(ev,clean){
					clean[0]();
				});
			}
		};
	}


	//jLoading Directive Fn
	function jLoadingDirectiveFn($mFactory,$document)
	{
		return({
			template : "<div j-click='$closeModal()' id='projata-loading'><div></div></div>",
			$init : jLoadingInitFn
		});

		function jLoadingInitFn(ele,attr,$model)
		{
			$mFactory.modalObjects.loading = _(ele.getFirstChild());
		}
	}


	//jModalUi Fn
	function jModalUiFn()
	{
		return ({ 
			template:function(ele,attr){
				return "<j-modal></j-modal><j-theatre></j-theatre><j-loading></j-loading>";
			}
		});
	}

	// jTabPreviewDirectiveFn Function
	function jTabPreviewDirectiveFn($mFactory,$doc)
	{
		return ({
			template : "<div id='jTabHolder' class='tabShade'><span class='fa fa-caret-{%arrow%} fa-2x tabArrow_{%arrow%}'></span><div id='tabBox'><div j-include='url'></div> <div j-html='content'></div></div></div>"
		});


	}


})();