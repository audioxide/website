export default ({ app }) => {
    if (process.env.NETLIFY !== 'true' || process.env.CONTEXT !== 'production') return;

    window.goatcounter = { no_onload: true };

    app.router.afterEach((to, from) => {
        if (typeof window.goatcounter.count === 'function') {
            window.goatcounter.count({
                path: to.fullPath,
            });
        }
    });
}