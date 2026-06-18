// assets/content-map.js
// 站点内容分区和关键词标签数据，提供搜索过滤功能

const siteContentMap = {
  site: "https://stream-kaiyun-cn.com.cn",
  primaryKeyword: "开云",
  sections: [
    {
      id: "home",
      title: "首页",
      slug: "/",
      tags: ["开云", "首页", "推荐"],
      keywords: ["开云首页", "开云推荐", "开云最新"],
      content: "欢迎来到开云平台"
    },
    {
      id: "live",
      title: "直播",
      slug: "/live",
      tags: ["开云", "直播", "体育"],
      keywords: ["开云直播", "开云体育", "开云赛事"],
      content: "开云体育直播频道"
    },
    {
      id: "esports",
      title: "电竞",
      slug: "/esports",
      tags: ["开云", "电竞", "游戏"],
      keywords: ["开云电竞", "开云游戏", "开云竞赛"],
      content: "开云电竞赛事专区"
    },
    {
      id: "casino",
      title: "真人娱乐",
      slug: "/casino",
      tags: ["开云", "真人", "娱乐"],
      keywords: ["开云真人", "开云娱乐", "开云赌场"],
      content: "开云真人娱乐平台"
    },
    {
      id: "sports",
      title: "体育博彩",
      slug: "/sports",
      tags: ["开云", "体育", "博彩"],
      keywords: ["开云体育", "开云投注", "开云赔率"],
      content: "开云体育博彩板块"
    },
    {
      id: "promotions",
      title: "优惠活动",
      slug: "/promotions",
      tags: ["开云", "优惠", "活动"],
      keywords: ["开云优惠", "开云活动", "开云奖励"],
      content: "开云最新优惠"
    },
    {
      id: "vip",
      title: "VIP俱乐部",
      slug: "/vip",
      tags: ["开云", "VIP", "会员"],
      keywords: ["开云VIP", "开云会员", "开云俱乐部"],
      content: "开云VIP专属服务"
    }
  ],
  config: {
    searchMinLength: 2,
    maxResults: 10,
    fuzzyMatch: true
  }
};

function searchContent(query) {
  if (!query || query.trim().length < siteContentMap.config.searchMinLength) {
    return [];
  }

  const lowerQuery = query.toLowerCase().trim();
  const results = [];

  for (const section of siteContentMap.sections) {
    let matchScore = 0;

    // Check tags
    for (const tag of section.tags) {
      if (tag.toLowerCase().includes(lowerQuery)) {
        matchScore += 2;
      }
    }

    // Check keywords
    for (const keyword of section.keywords) {
      if (keyword.toLowerCase().includes(lowerQuery)) {
        matchScore += 3;
      }
    }

    // Check title
    if (section.title.toLowerCase().includes(lowerQuery)) {
      matchScore += 1;
    }

    // Check content
    if (section.content.toLowerCase().includes(lowerQuery)) {
      matchScore += 1;
    }

    if (matchScore > 0) {
      results.push({
        id: section.id,
        title: section.title,
        slug: section.slug,
        relevance: matchScore,
        url: siteContentMap.site + section.slug,
        tags: section.tags,
        snippet: section.content
      });
    }
  }

  results.sort((a, b) => b.relevance - a.relevance);

  return results.slice(0, siteContentMap.config.maxResults);
}

function getAllTags() {
  const tagSet = new Set();
  for (const section of siteContentMap.sections) {
    for (const tag of section.tags) {
      tagSet.add(tag);
    }
  }
  return Array.from(tagSet).sort();
}

function getSectionById(id) {
  return siteContentMap.sections.find(section => section.id === id) || null;
}

function getPrimaryKeyword() {
  return siteContentMap.primaryKeyword;
}

function getSiteUrl() {
  return siteContentMap.site;
}

// Export for Node.js or global for browser
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    siteContentMap,
    searchContent,
    getAllTags,
    getSectionById,
    getPrimaryKeyword,
    getSiteUrl
  };
}