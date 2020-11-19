export default ({ app }) => {
    window.goatcounter = { no_onload: true };

    if (process.env.NETLIFY !== 'true' || process.env.CONTEXT !== 'production') return;

    app.router.afterEach((to, from) => {
        if (typeof window.goatcounter.count === 'function') {
            window.goatcounter.count({
                path: to.fullPath,
            });
        }
    });
}