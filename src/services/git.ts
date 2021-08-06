import {Http} from '../models/http';

import {GITHUB_TOKEN, GitApi} from '../constants';

class Git extends Http {
    token = GITHUB_TOKEN;

    headers = {
        Authorization: `token ${this.token}`,
        Accept: 'application/vnd.github.v3+json'
    };

    private decodeBase64(content = '') {
        const utf8String = Buffer.from(content, 'base64').toString('utf-8');

        return JSON.parse(utf8String);
    }

    async fetchTubLibrary() {
        try {
            const {
                data: {content = ''}
            } = await this.get(`${GitApi.Repos}/tini2n/tagion-tub/contents/library.json?ref=master`, {
                headers: this.headers
            });

            return this.decodeBase64(content);
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default new Git();
