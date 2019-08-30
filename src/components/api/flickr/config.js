const apiKey = '522c1f9009ca3609bcbaf08545f067ad';
export const flickrConfig = {
    baseUrl: 'https://api.flickr.com/',
    apiKey: apiKey,
    endPoints: {
        images:`services/rest/?method=flickr.photos.search&api_key=${apiKey}&tag_mode=any&per_page=100&format=json&nojsoncallback=1`
    }
}