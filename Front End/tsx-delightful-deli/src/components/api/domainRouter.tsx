const domainRouter = (domain: string) => {
    if (domain === 'item') {
        return '/items/';
    } else if (domain === 'transaction') {
        return '/transactions/';
    } else return ''
}
export default domainRouter