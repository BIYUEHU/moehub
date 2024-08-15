-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- 主机： localhost
-- 生成日期： 2024-08-14 20:57:53
-- 服务器版本： 5.7.44-log
-- PHP 版本： 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

START TRANSACTION;

SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;
/*!40101 SET NAMES utf8mb4 */
;

--
-- 数据库： `moehub`
--

-- --------------------------------------------------------

--
-- 表的结构 `Character`
--

CREATE TABLE `Character` (
    `id` int(11) NOT NULL,
    `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
    `romaji` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
    `gender` enum('MALE', 'FEMALE', 'OTHER') COLLATE utf8mb4_unicode_ci NOT NULL,
    `alias` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `age` int(11) DEFAULT NULL,
    `images` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `url` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `description` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `comment` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `hitokoto` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `birthday` datetime(3) DEFAULT NULL,
    `voice` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `series` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
    `seriesGenre` enum(
        'ANIME',
        'COMIC',
        'GALGAME',
        'GAME',
        'NOVEL',
        'OTHER'
    ) COLLATE utf8mb4_unicode_ci NOT NULL,
    `tags` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `hairColor` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `eyeColor` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `bloodType` enum('A', 'B', 'AB', 'O') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `height` int(11) DEFAULT NULL,
    `bust` int(11) DEFAULT NULL,
    `waist` int(11) DEFAULT NULL,
    `hip` int(11) DEFAULT NULL,
    `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `color` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `hide` tinyint(1) NOT NULL DEFAULT '0',
    `order` int(11) NOT NULL DEFAULT '50',
    `songId` int(11) DEFAULT NULL,
    `weight` int(11) DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

--
-- 转存表中的数据 `Character`
--

INSERT INTO
    `Character` (
        `id`,
        `name`,
        `romaji`,
        `gender`,
        `alias`,
        `age`,
        `images`,
        `url`,
        `description`,
        `comment`,
        `hitokoto`,
        `birthday`,
        `voice`,
        `series`,
        `seriesGenre`,
        `tags`,
        `hairColor`,
        `eyeColor`,
        `bloodType`,
        `height`,
        `bust`,
        `waist`,
        `hip`,
        `createdAt`,
        `color`,
        `hide`,
        `order`,
        `songId`,
        `weight`
    )
VALUES (
        4,
        '有村ロミ',
        'Arimura Romi',
        'FEMALE',
        '比村茜|有村路美|Himura Akane',
        NULL,
        'https://t.vndb.org/ch/59/121359.jpg|https://hotaru.icu/api/agent/?url=https://img.moegirl.org.cn/common/8/85/%E6%9C%89%E6%9D%91%E3%83%AD%E3%83%9F.png',
        'https://mzh.moegirl.org.cn/%E6%9C%89%E6%9D%91%E8%B7%AF%E7%BE%8E',
        '喜欢的事物是恐龙、酸奶和科幻小说，讨厌的事物是满员电车和自行车（因为不会骑）。',
        '倾尽一切只为你，感性而又可爱，热烈而又长情，对理工男来说简直是梦中情人般的理想存在。',
        '当城市之中亮起灯火时，夜空的繁星便黯然失色。',
        '2001-09-10 16:00:00.000',
        '月野姬彩',
        'アインシュタインより愛を込めて',
        'GALGAME',
        '高中生|优等生|同班同学|天才少女|科学家|水手服|超短裙|四分之三袜|发夹|耳坠|贫乳|短发|幼驯染|青梅竹马',
        '粉发',
        '蓝瞳',
        NULL,
        149,
        77,
        51,
        78,
        '2024-06-12 11:03:16.040',
        'b65a87',
        0,
        50,
        1495859173,
        NULL
    );

-- --------------------------------------------------------

--
-- 表的结构 `CharacterWithCollection`
--

CREATE TABLE `CharacterWithCollection` (
    `id` int(11) NOT NULL,
    `characterId` int(11) NOT NULL,
    `collectionId` int(11) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- 表的结构 `Collection`
--

CREATE TABLE `Collection` (
    `id` int(11) NOT NULL,
    `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
    `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

--
-- 转存表中的数据 `Collection`
--

INSERT INTO
    `Collection` (`id`, `name`, `description`)
VALUES (1, 'co1', 'descr...');

-- --------------------------------------------------------

--
-- 表的结构 `Settings`
--

CREATE TABLE `Settings` (
    `id` int(11) NOT NULL,
    `key` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
    `value` longtext COLLATE utf8mb4_unicode_ci
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

--
-- 转存表中的数据 `Settings`
--

INSERT INTO
    `Settings` (`id`, `key`, `value`)
VALUES (1, 'site_title', 'MoeHub'),
    (2, 'site_name', 'Moe Hub'),
    (
        3,
        'site_url',
        'http://127.0.0.1'
    ),
    (
        4,
        'home_description',
        '欢迎来到 Arimura Sena の角色收藏网站~ 角色列表会定期不断更新，欢迎关注！'
    ),
    (
        5,
        'admin_username',
        'Arimura Sena'
    ),
    (
        6,
        'admin_email',
        'admin@gmail.com'
    ),
    (
        8,
        'site_logo',
        '/favicon.png'
    ),
    (10, 'google_analytics_id', ''),
    (
        11,
        'smtp_host',
        'smtp.qq.com'
    ),
    (12, 'smtp_port', '465'),
    (13, 'smtp_email', ''),
    (14, 'smtp_key', ''),
    (15, 'smtp_hours', '0'),
    (16, 'birthdays', 'on'),
    (
        17,
        'site_backgrounds',
        'https://himeno-sena.com/pic12.jpg|https://himeno-sena.com/pic8.jpg|https://himeno-sena.com/pic7.jpg'
    ),
    (
        18,
        'home_buttons',
        'GitHub,https://github.com/biyuehu|个人博客,https://hotaru.icu|哔哩哔哩,https://space.bilibili.com/293767574|班固米,https://bgm.tv/user/himeno'
    ),
    (
        21,
        'home_timeline',
        '2024/6/14,网站上线|2024/6/16,修了点 bug，更改了标签表单样式|2024/8/14,v1.0 正式版发布'
    ),
    (
        22,
        'home_custom',
        '<h3><strong>这是什么？</strong></h3>         <span><strong>MoeHub</strong> 是一个开源的个人向喜爱角色收藏网站，在这里可以收集曾经经历过的故事与邂逅并令你心动的美少女。</span>         <h3><stronssg>如何创建自己的网站？</stronssg></h3>         <span>请前往 <a href=\"https://github.com/biyuehu/moehub\">GitHub</a> 了解详情。</span>'
    ),
    (23, 'custom_head_code', ''),
    (24, 'custom_foot_code', ''),
    (
        25,
        'admin_salt',
        '6ef23467d1d34e60ab5acacae30e631c'
    ),
    (
        26,
        'admin_password',
        '75e04ba5d47096011a276bd010db68cf098819e25db65f663914ec8b379657a0'
    ),
    (
        27,
        'smtp_template',
        '还记得吗？今天是 %month% 月 %day% 日，是角色 %name%（%romaji%） 的生日哦，快去为她献上祝福吧！'
    ),
    (28, 'smtp_target', '');

--
-- 转储表的索引
--

--
-- 表的索引 `Character`
--
ALTER TABLE `Character`
ADD PRIMARY KEY (`id`),
ADD UNIQUE KEY `Character_id_name_key` (`id`, `name`);

--
-- 表的索引 `CharacterWithCollection`
--
ALTER TABLE `CharacterWithCollection`
ADD PRIMARY KEY (`id`),
ADD KEY `character_collection_index` (`characterId`, `collectionId`),
ADD KEY `CharacterWithCollection_collectionId_fkey` (`collectionId`);

--
-- 表的索引 `Collection`
--
ALTER TABLE `Collection`
ADD PRIMARY KEY (`id`),
ADD UNIQUE KEY `Collection_id_name_key` (`id`, `name`);

--
-- 表的索引 `Settings`
--
ALTER TABLE `Settings` ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `Character`
--
ALTER TABLE `Character`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,
AUTO_INCREMENT = 18;

--
-- 使用表AUTO_INCREMENT `CharacterWithCollection`
--
ALTER TABLE `CharacterWithCollection`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `Collection`
--
ALTER TABLE `Collection`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,
AUTO_INCREMENT = 2;

--
-- 使用表AUTO_INCREMENT `Settings`
--
ALTER TABLE `Settings`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,
AUTO_INCREMENT = 29;

--
-- 限制导出的表
--

--
-- 限制表 `CharacterWithCollection`
--
ALTER TABLE `CharacterWithCollection`
ADD CONSTRAINT `CharacterWithCollection_characterId_fkey` FOREIGN KEY (`characterId`) REFERENCES `Character` (`id`) ON UPDATE CASCADE,
ADD CONSTRAINT `CharacterWithCollection_collectionId_fkey` FOREIGN KEY (`collectionId`) REFERENCES `Collection` (`id`) ON UPDATE CASCADE;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;