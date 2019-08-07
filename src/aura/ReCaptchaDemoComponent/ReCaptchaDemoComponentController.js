({
	onScriptLoaded : function(component, event, helper) {
        jQuery(function($){
            let iframe = $('.recaptchaFrame');  
            iframe = iframe[0];
            iframe.height = '60px';
        });
	},
    doInit : function(component, event, helper) {
        window.addEventListener("message", function(event) {
            let hostOrigin = "https://test-dev-ed--foolish.ap5.visual.force.com"; //window.location.origin
            if (event.origin !==  hostOrigin) {
                return;
            } 
            if (event.data && event.data.action && event.data.action === 'verified') {
				component.set ('v.hasreCaptchaVerified', true);  
            } else if (event.data && event.data.action && event.data.action === 'error') {
				component.set ('v.hasreCaptchaVerified', false);                                                          
            } else if (event.data && event.data.action && event.data.action === 'expired') {
                component.set ('v.hasreCaptchaVerified', false);             
            } else if (event.data && event.data.action && event.data.action === 'loaded') {
                component.set ('v.hasreCaptchaVerified', false); 
            }
            if (event.data && event.data.action && event.data.action === 'heigthChange') {
                let iframe = $('.recaptchaFrame');  
                iframe = iframe[0];
               	iframe.height = event.data.height;
            }
        }, false);
	},
})