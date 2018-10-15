
tinymce.PluginManager.add('freedistraction', function(editor) {
	var freedistractionState = false, DOM = tinymce.DOM, iframeWidth, iframeHeight, resizeHandler;
	var containerWidth, containerHeight, scrollPos;

	if (editor.settings.inline) {
		return;
	}

	function getWindowSize() {
		var w, h, win = window, doc = document;
		var body = doc.body;

		// Old IE
		if (body.offsetWidth) {
			w = body.offsetWidth;
			h = body.offsetHeight;
		}

		// Modern browsers
		if (win.innerWidth && win.innerHeight) {
			w = win.innerWidth;
			h = win.innerHeight;
		}

		return {w: w, h: h};
	}

	function getScrollPos() {
		var vp = tinymce.DOM.getViewPort();

		return {
			x: vp.x,
			y: vp.y
		};
	}

	function setScrollPos(pos) {
		scrollTo(pos.x, pos.y);
	}

	function toggleFreeDistraction() {
		var body = document.body, documentElement = document.documentElement, editorContainerStyle;
		var editorContainer, iframe, iframeStyle;

		function resize() {
			DOM.setStyle(iframe, 'height', getWindowSize().h - (editorContainer.clientHeight - iframe.clientHeight));
		}

		freedistractionState = !freedistractionState;

		editorContainer = editor.getContainer();
		editorContainerStyle = editorContainer.style;
		iframe = editor.getContentAreaContainer().firstChild;
		iframeStyle = iframe.style;
		//Modificación para ajustar al tamaño de un post.
		var iframeDoc = iframe.contentWindow.document;
		var iframeBody = iframeDoc.getElementsByTagName('body')[0];
		var iframeHTML = iframeDoc.getElementsByTagName('html')[0];

		//Fin modificación.

		if (freedistractionState) {
			scrollPos = getScrollPos();
			iframeWidth = iframeStyle.width;
			iframeHeight = iframeStyle.height;
			iframeStyle.width = iframeStyle.height = '100%';
			containerWidth = editorContainerStyle.width;
			containerHeight = editorContainerStyle.height;
			editorContainerStyle.width = editorContainerStyle.height = '';

			DOM.addClass(body, 'mce-freedistraction');
			DOM.addClass(documentElement, 'mce-freedistraction');
			DOM.addClass(editorContainer, 'mce-freedistraction');

			DOM.bind(window, 'resize', resize);
			resize();
			resizeHandler = resize;
			//Modificación para ajustar al tamaño de un post.
			iframeBody.style.width = '850px';
			iframeBody.style.margin = '0 auto';
			iframeBody.style.padding = '20px';
			iframeBody.style.border = '1px solid #DDD';
			iframeHTML.style.backgroundColor = "#F5F8FA";
			//Fin modificación.
		} else {
			iframeStyle.width = iframeWidth;
			iframeStyle.height = iframeHeight;

			if (containerWidth) {
				editorContainerStyle.width = containerWidth;
			}

			if (containerHeight) {
				editorContainerStyle.height = containerHeight;
			}

			DOM.removeClass(body, 'mce-freedistraction');
			DOM.removeClass(documentElement, 'mce-freedistraction');
			DOM.removeClass(editorContainer, 'mce-freedistraction');
			DOM.unbind(window, 'resize', resizeHandler);

			//Modificación para ajustar al tamaño de un post.
			iframeBody.style.width = 'auto';
			iframeBody.style.margin = '8px';
			iframeBody.style.padding = '1px';
			iframeBody.style.paddingBottom = '50px';
			iframeHTML.style.backgroundColor = "#fff";
			iframeBody.style.border = '0px';
			//Fin modificación.

			setScrollPos(scrollPos);
		}

		editor.fire('FreeDistractionStateChanged', {state: freedistractionState});
	}

	editor.on('init', function() {
		editor.addShortcut('Ctrl+Shift+F', '', toggleFreeDistraction);
	});

	editor.on('remove', function() {
		if (resizeHandler) {
			DOM.unbind(window, 'resize', resizeHandler);
		}
	});

	editor.addCommand('mceFreeDistraction', toggleFreeDistraction);

	editor.addMenuItem('freedistraction', {
		text: 'Free Distraction',
		shortcut: 'Ctrl+Shift+F',
		selectable: true,
		onClick: function() {
			toggleFreeDistraction();
			editor.focus();
		},
		onPostRender: function() {
			var self = this;

			editor.on('FreeDistractionStateChanged', function(e) {
				self.active(e.state);
			});
		},
		context: 'view'
	});

	editor.addButton('freedistraction', {
		tooltip: 'Free Distraction',
		icon: ' move icon',
		shortcut: 'Ctrl+Shift+F',
		onClick: toggleFreeDistraction,
		onPostRender: function() {
			var self = this;

			editor.on('FreeDistractionStateChanged', function(e) {
				self.active(e.state);
			});
		}
	});

	return {
		isFreeDistraction: function() {
			return freedistractionState;
		}
	};
});
