export const getSearchQuery = (searchText) => {
    return `
    {"from":0,"size":5,"query":{"function_score":{"query":{"bool":{"should":[{"bool":{"must":[{"bool":{"should":[{"multi_match":{"query":"${searchText}","fields":["post_title^10","post_excerpt^5","terms.category.name^1","terms.tag.name^1"],"boost":1,"fuzziness":"auto"}},{"multi_match":{"query":"${searchText}","fields":["post_content^1"],"boost":1,"fuzziness":0,"operator":"and"}}]}}],"filter":[{"match":{"post_type.raw":"post"}}]}}]}},"score_mode":"sum","boost_mode":"multiply"}},"post_filter":{"bool":{"must":[{"terms":{"post_type.raw":["post","page"]}},{"terms":{"post_status":["publish","merged"]}},{"exists":{"field":"meta.path.raw"}}],"must_not":[{"terms":{"meta.hidden_in_search_results.value":[1]}}]}},"highlight":{"pre_tags":["<b>"],"post_tags":["</b>"],"fields":{"post_title":{},"terms.post_tag.name":{},"post_excerpt":{},"terms.category.name":{}}}}
    `;
}