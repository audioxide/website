export default ({ app }) => {
    window.goatcounter = { no_onload: true };
    let timeoutUID;

    app.router.afterEach((to, from) => {
        if (process.env.isProduction !== true) {
            console.log(`Count pageview for '${to.fullPath}'`);
        } else if (typeof window.goatcounter.count === 'function') {
            // TODO: Nasty temporary hack to wait for title change, improve
            if (typeof timeoutUID === 'number') clearTimeout(timeoutUID);
            timeoutUID = setTimeout(() => {
                timeoutUID = null;
                window.goatcounter.count({
                    path: to.fullPath,
                });
            }, 1000);
        }
    });
}