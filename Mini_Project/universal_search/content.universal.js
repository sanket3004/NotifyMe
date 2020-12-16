chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {

    if(msg.active == true) {

        let searchString = document.querySelector('[name="q"]');
        let listLink = document.querySelectorAll('.rc>div>a');
        let domains = [];

        if(listLink && listLink.length && searchString && searchString.value) {

            for (var i = 0; i < listLink.length; i++) {

                let url = new URL(listLink[i].href);
                let domain = url.hostname.replace('www.', '');

                domains.push(domain);
            }

            sendResponse({domains: domains, search: searchString});
        }
 
    } else if(msg.generate == true && (msg.ads == 0 || msg.ads == 1)) {

        let SUBID = "test";
        let listSearch = document.querySelectorAll('.rc');

        for (let i = 0; i < listSearch.length; i++) {

            let childElement = listSearch[i];

            if(childElement) {

                let rLinkChild = childElement.querySelector(':nth-child(1)');
                let sLinkChild = childElement.querySelector(':nth-child(2)');
                let url = new URL(rLinkChild.querySelector('a').href);
                let urlEncode = encodeURI(url);
                let searchString = document.querySelector('[name="q"]').value;
                let domain = url.hostname.replace('www.', '');
                let referer = encodeURI(document.location.href);
                let affiliateLink = "http://www.smartredirect.de/redir/clickGate.php?u="+msg.MEMBER_HASH+
                    "&m=12&p="+msg.PANEL_HASH+
                    "&s="+SUBID+
                    "&q="+searchString+
                    "&url="+urlEncode+
                    "&r="+referer;

                for (let j = 0; j < msg.list.length; j++) {

                    if(msg.list[j].domain == domain) {

                        let img = document.createElement('img');
                        img.src = 'https://logo.gdprvalidate.de/logos_v2/120x60/'+msg.list[j].hash+'.gif';
                        
                        let a = document.createElement('a');
                        a.href = affiliateLink;
                        a.style = 'float: left; margin-right: 10px;';

                        if(msg.ads == 1) {
                            a.appendChild(img);
                        }

                        rLinkChild.querySelector('a').href = affiliateLink;
                        sLinkChild.style = 'display: flow-root';
                        sLinkChild.innerHTML = a.outerHTML + sLinkChild.innerHTML;

                    }

                }

            }

        }


    }

});




