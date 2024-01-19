const domainRouter = (domain: string) => {
    const domainRoutes: Record<string, string> = {
        'item': '/items/',
        'transaction': '/transactions/',
    };

    return domainRoutes[domain] || '';
};

export default domainRouter;
