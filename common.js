/**
 *
 * @authors xieq (xieq@zsgjs.com)
 * @date    2014-08-06 14:03:31
 * @version 1.0
 */
$(document).ready(function($) {
	var state = {
		title: "index",
		url: "index.html"
	};
	$("#cn").click(function() {
		window.history.pushState(state, "index", "second.html");
		var $self = $(this);
		$.ajax({
			url: 'second.html',
			dataType: 'html',
			complete: function(jqXHR, status, responseText) {
				responseText = jqXHR.responseText;
				if(jqXHR.isResolved()) {
					jqXHR.done(function(r) {
						responseText = r;
					});
					$self.html($("<div>").append(responseText.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")).find("#cn"));
				}
			}
		});
		document.title = "second";
		return false;
	});
	$(window).bind('popstate', function(e) {
		var sr = e.state;
		$.ajax( {
			url: "index.html",
			dataType: "html",
			complete: function(jqXHR, status, responseText) {
				responseText = jqXHR.responseText;
				if (jqXHR.isResolved()) {
					jqXHR.done(function(r) {
						responseText = r;
					});
					$("#cn").html($("<div>")).append(responseText.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")).find("#cn");
				}
			}
		});
		document.title = e.state.title;
	});
});

