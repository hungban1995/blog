-- phpMyAdmin SQL Dump
-- version 4.7.1
-- https://www.phpmyadmin.net/
--
-- Host: sql12.freemysqlhosting.net
-- Generation Time: May 30, 2023 at 02:03 PM
-- Server version: 5.5.62-0ubuntu0.14.04.1
-- PHP Version: 7.0.33-0ubuntu0.16.04.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sql12621773`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(10) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` varchar(500) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `image` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `title`, `description`, `createdAt`, `updatedAt`, `image`) VALUES
(1, 'People', 'Quae in controversiam veniunt, de iis, si placet, disseramus. Iam quae corporis sunt, ea nec auctoritatem cum animi partibus. fds fsd', '2023-05-16 08:39:41', '2023-05-24 09:26:29', 37),
(5, 'Review', 'Vestibulum vehicula dui venenatis neque tempor, accumsan iaculis sapien ornare. Sed at ante porta, ullamcorper massa eu, ullamcorper sapien.', '2023-05-16 10:21:46', '2023-05-24 09:48:33', 38),
(11, 'Story', 'Quae quo sunt excelsiores, eo dant clariora indicia naturae. Sed haec quidem liberius ab eo dicuntur et saepius. Et ille ridens video, inquit, quid agas tum ille timide vel potius verecunde.', '2023-05-24 06:57:58', '2023-05-24 09:49:38', 39),
(12, 'Lifestyle', 'Quos nisi redarguimus, omnis virtus, omne decus, omnis vera laus deserenda est.', '2023-05-24 06:58:40', '2023-05-24 09:50:06', 39),
(13, 'Product', 'Quae in controversiam veniunt, de iis, si placet, disseramus. Iam quae corporis sunt, ea nec auctoritatem cum animi.', '2023-05-24 09:51:06', '2023-05-24 10:18:03', 40),
(14, 'Design', 'Controversiam veniunt, de iis, si placet Disseramus Iam quae corporis sunt, ea nec auctoritatem cum animi partibus.', '2023-05-24 09:52:26', '2023-05-24 10:17:49', 41),
(15, 'Creative', 'Utilitatis causa amicitia est quaesita. Quae quo sunt excelsiores, eo dant clariora indicia naturae.', '2023-05-24 09:53:02', '2023-05-24 10:17:33', 42),
(16, 'Idea', 'Non igitur bene. Reicietur etiam Carneades, nec ulla de summo bono ratio aut voluptatis non dolendive particeps aut honestatis expers probabitur.', '2023-05-24 09:53:45', '2023-05-24 10:17:20', 43);

-- --------------------------------------------------------

--
-- Table structure for table `category_lookup`
--

CREATE TABLE `category_lookup` (
  `postId` int(10) NOT NULL,
  `categoryId` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `category_lookup`
--

INSERT INTO `category_lookup` (`postId`, `categoryId`) VALUES
(24, 1),
(25, 12),
(25, 11),
(26, 12),
(26, 11),
(27, 5),
(27, 11),
(38, 1),
(38, 15);

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `id` int(10) NOT NULL,
  `url` varchar(1000) NOT NULL,
  `alt` varchar(200) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `uploadBy` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`id`, `url`, `alt`, `createdAt`, `updatedAt`, `uploadBy`) VALUES
(22, 'uploads/05-2023/1684220061722-263974369-avatar.png', '', '2023-05-16 06:54:21', '2023-05-16 06:54:21', 48),
(23, 'uploads/05-2023/1684220065892-122723118-download.png', '', '2023-05-16 06:54:25', '2023-05-16 06:54:25', 48),
(24, 'uploads/05-2023/1684220088626-161033685-logo_blog.png', '', '2023-05-16 06:54:48', '2023-05-16 06:54:48', 48),
(27, 'uploads/05-2023/1684398518525-28105955-27-3.jpg', '', '2023-05-18 08:28:38', '2023-05-18 08:28:38', 48),
(29, 'uploads/05-2023/1684482256803-289113752-clay-banks-XvS-uKUoUao-unsplash.jpg', '', '2023-05-19 07:44:16', '2023-05-19 07:44:16', 48),
(31, 'uploads/05-2023/1684828391023-775931608-newpostcontent1.jpg', '', '2023-05-23 07:53:11', '2023-05-23 07:53:11', 48),
(32, 'uploads/05-2023/1684828430949-287727521-newpost1.jpg', '', '2023-05-23 07:53:50', '2023-05-23 07:53:50', 48),
(33, 'uploads/05-2023/1684911414581-404084023-yellow-cactus-IMSHfJFuA3k-unspla.jpg', '', '2023-05-24 06:56:54', '2023-05-24 06:56:54', 48),
(34, 'uploads/05-2023/1684911545905-116279642-photo-1644478509397-27d9b27771fe.jpg', '', '2023-05-24 06:59:05', '2023-05-24 06:59:05', 48),
(35, 'uploads/05-2023/1684911648773-312465812-photo-1593259037198-c720f4420d7f.jpg', '', '2023-05-24 07:00:48', '2023-05-24 07:00:48', 48),
(36, 'uploads/05-2023/1684912067638-78562054-photo-1644463589256-02679b9c0767.jpg', '', '2023-05-24 07:07:47', '2023-05-24 07:07:47', 48),
(37, 'uploads/05-2023/1684920383077-52841680-photo-1633113214698-485cdb2f56fd.jpg', '', '2023-05-24 09:26:23', '2023-05-24 09:26:23', 48),
(38, 'uploads/05-2023/1684921707379-692294779-review.jpg', '', '2023-05-24 09:48:27', '2023-05-24 09:48:27', 48),
(39, 'uploads/05-2023/1684921772948-44530597-story.jpg', '', '2023-05-24 09:49:32', '2023-05-24 09:49:32', 48),
(40, 'uploads/05-2023/1684921861331-592604420-product.jpg', '', '2023-05-24 09:51:01', '2023-05-24 09:51:01', 48),
(41, 'uploads/05-2023/1684921941095-353456351-design.jpg', '', '2023-05-24 09:52:21', '2023-05-24 09:52:21', 48),
(42, 'uploads/05-2023/1684921976872-995470548-crevant.jpg', '', '2023-05-24 09:52:56', '2023-05-24 09:52:56', 48),
(43, 'uploads/05-2023/1684922021011-82206332-idea.jpg', '', '2023-05-24 09:53:41', '2023-05-24 09:53:41', 48);

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(10) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `content` longtext NOT NULL,
  `image` int(10) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `author` int(10) NOT NULL,
  `updatedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `isDraft` tinyint(1) NOT NULL,
  `url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `title`, `description`, `content`, `image`, `createdAt`, `author`, `updatedAt`, `isDraft`, `url`) VALUES
(24, 'Every day, in every city and town across the country', 'Morbi a facilisis lectus. Ut eu dapibus risus, a interdum justo. Vestibulum volutpat velit ac tellus mollis, sit amet sodales metus elementum. Aliquam eu mi massa. Proin suscipit enim a pulvinar viverra.', '<p>Morbi a facilisis lectus. Ut eu dapibus risus, a interdum justo. Vestibulum volutpat velit ac tellus mollis, sit amet sodales metus elementum. Aliquam eu mi massa. Proin suscipit enim a pulvinar viverra. Sed egestas nulla vitae risus imperdiet, ac bibendum tortor faucibus. Fusce tempor libero vitae risus tristique, at iaculis est lacinia. Cras id accumsan nibh, eu posuere nisl.</p><ul><li>Duis sodales dolor fermentum porttitor hendrerit.</li><li>Curabitur id pharetra ligula. Integer porttitor suscipit ante ac faucibus. Sed a enim non enim viverra pulvinar quis ac velit.</li><li>In vel diam ut lorem congue feugiat. Proin sed porta velit.</li></ul><p>Sed ligula ante, aliquet nec pellentesque ut, pellentesque quis enim. Donec sit amet malesuada lectus. Aenean rhoncus lacinia viverra. Nunc eu tincidunt est, a dictum tortor. Praesent faucibus tempus sollicitudin. Ut auctor blandit sem sit amet tristique. Maecenas ligula sapien, imperdiet sed nibh in, euismod dictum lorem. Ut ex libero, tempus in massa eu, laoreet tristique sapien. Nunc ultricies finibus nunc, sit amet aliquam tellus porttitor id. Nulla egestas ac magna id rutrum. Aliquam erat volutpat. Duis venenatis, ipsum eget dictum tempor, magna lectus consectetur magna, eu ornare orci dui sed velit. Sed id augue quis magna dapibus gravida a et tellus.</p><blockquote><p>Nullam rutrum mi metus, sit amet consectetur erat sollicitudin eu. Donec mattis nisi ut pulvinar iaculis.</p></blockquote><p>Quisque vulputate ultricies est, eget sagittis arcu pharetra convallis. Morbi dictum venenatis ipsum, sed fermentum tortor pharetra ut. Nulla facilisi. Sed lobortis, lectus tristique convallis hendrerit, est lorem luctus dolor, eu lobortis lectus augue eu velit. Pellentesque fermentum nunc est, in semper elit varius at. Phasellus vel dui et ligula interdum aliquet. Pellentesque rutrum dapibus ligula ac pharetra. In ut tempus sapien. Duis pharetra consequat egestas.</p><figure class=\"image\"><img src=\"http://localhost:8080//uploads/05-2023/1684911414581-404084023-yellow-cactus-IMSHfJFuA3k-unspla.jpg\"></figure><p>Nullam eleifend purus tellus, vel lobortis mauris tempus sit amet. Aliquam erat volutpat. Duis et ipsum pulvinar, iaculis nibh in, maximus lectus. Phasellus nec dictum tellus, ut tincidunt lectus. Quisque efficitur, leo eget tempor pretium, leo nisi accumsan arcu, pellentesque pharetra nulla ipsum sed erat. In commodo, nunc nec tempus volutpat, nisi lacus euismod diam, ac molestie turpis nunc vitae erat. Donec blandit commodo risus, eget pellentesque diam tincidunt eget. Suspendisse imperdiet efficitur mauris et ornare. Pellentesque tincidunt nunc dui, sed dictum mi mattis ac. Donec ac libero condimentum, bibendum ipsum non, elementum velit. Quisque egestas ipsum vel dignissim dignissim.</p><p>Quisque blandit et erat id lobortis. Sed eu venenatis erat. Nunc non libero in nunc aliquet varius. Suspendisse vitae congue dui. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla pharetra ligula in dictum porttitor. Duis sed congue lectus. Morbi sed ipsum egestas nulla gravida sodales. Aenean lacus quam, malesuada placerat viverra ut, lacinia vel enim. Donec non tortor nec sapien tincidunt imperdiet.</p><p>Aliquam erat volutpat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut sed velit arcu. Suspendisse rhoncus arcu eget lorem pretium convallis eget vitae nibh. Nullam vehicula egestas est, non fringilla elit consectetur non. Suspendisse in euismod diam. Nullam fringilla odio vitae elit mollis semper. Mauris ultrices hendrerit ipsum, at gravida est ornare sed. Nunc egestas nibh id lobortis facilisis. Donec urna nibh, dignissim sit amet velit nec, elementum ultrices mauris. Vivamus fringilla dui eu orci tincidunt porttitor. Nunc sagittis augue et dui ornare, vitae aliquet metus pretium. Fusce eu ipsum ligula.</p><p>Nullam aliquet consequat sollicitudin. Maecenas elementum finibus velit non vestibulum. Aliquam semper venenatis tellus sit amet volutpat. Suspendisse commodo nibh sit amet dapibus pharetra. Phasellus pulvinar elementum imperdiet. Donec placerat id dui vitae congue. Praesent risus nisl, ullamcorper nec mattis non, congue ac enim. Aliquam erat volutpat. Nulla fringilla urna quis dui sodales, vitae tristique felis viverra. Donec pretium tellus lorem, efficitur porta ex ullamcorper id.</p><h3>In volutpat</h3><p>Magna quis faucibus dignissim, dolor urna vestibulum ante, quis fringilla tortor quam dignissim ante. Quisque eleifend vulputate blandit. Sed elementum sit amet sapien vitae luctus. Nam consequat ante eget fermentum pretium. Fusce nulla sem, pretium eu sagittis id, lacinia nec nunc.</p><p>&nbsp;</p><p>&nbsp;</p><p>Morbi tempus laoreet odio a elementum. Nunc ut fringilla sapien, in aliquam est. Donec porttitor dui sit amet neque scelerisque feugiat accumsan nec mauris. Aliquam aliquet eget sapien eu molestie. Sed rutrum faucibus tellus. Cras at urna sit amet nisi vehicula dignissim. Praesent nibh augue, elementum non enim ut, convallis vehicula enim. In euismod, sapien sit amet pharetra ultricies, ante est tincidunt erat, eget posuere nisi lacus sit amet nunc. Pellentesque mollis diam non quam interdum, a commodo eros convallis. Etiam luctus condimentum arcu, et iaculis elit egestas a. Cras eget dui ac ligula blandit dictum.</p>', 34, '2023-05-24 14:59:11', 48, '2023-05-24 14:59:11', 0, 'every-day-in-every-city-and-town-across-the-country'),
(25, 'I work best when my space is filled with inspiration', 'Quae in controversiam veniunt, de iis, si placet, disseramus. Iam quae corporis sunt, ea nec auctoritatem cum animi partibus. Duo enim genera quae erant, fecit tria. Et quod est munus, quod opus sapientiae.', '<figure class=\"image\"><img src=\"http://localhost:8080//uploads/05-2023/1684911648773-312465812-photo-1593259037198-c720f4420d7f.jpg\"></figure><p>Ista parva sunt. Ad eos igitur converte te, quaeso. Haec para doca illi, nos admirabilia dicamus. Universa enim illorum ratione cum tota vestra confligendum puto. Sed ut iis bonis erigimur, quae expectamus, sic laetamur iis, quae recordamur.</p><ul><li>At hoc in eo Quid de Platone aut de Democrito loquar.</li><li>Quae quo sunt excelsiores, eo dant clariora indicia naturae. Sed haec quidem liberius ab eo dicuntur et saepius. Et ille ridens.</li></ul><p>Quae in controversiam veniunt, de iis, si placet, disseramus. Iam quae corporis sunt, ea nec auctoritatem cum animi partibus, comparandam et cognitionem habent faciliorem. Quam ob rem tandem, inquit, non satisfacit. Isto modo ne improbos quidem, si essent boni viri. Qui autem esse poteris, nisi te amor ipse ceperit. Utilitatis causa amicitia est quaesita.</p><h2>Ut placet sunt excelsiores</h2><p>Inquit, etsi enim illud erat aptius, aequum cuique concedere. Atqui reperies, inquit, in hoc quidem pertinacem. Quae quo sunt excelsiores, eo dant clariora indicia naturae. Sed haec quidem liberius ab eo dicuntur et saepius. Et ille ridens: Video, inquit, quid agas; Tum ille timide vel potius verecunde: Facio, inquit. An hoc usque quaque, aliter in vita? Unum nescio, quo modo possit, si luxuriosus sit, finitas cupiditates habere. Aliter enim explicari, quod quaeritur, non potest. Sed haec quidem liberius ab eo dicuntur et saepius.</p><p>Omnis virtus, omne decus, omnis vera laus deserenda est. Sed eum qui audiebant, quoad poterant, defendebant sententiam suam. Fatebuntur Stoici haec omnia dicta esse praeclare, neque eam causam Zenoni desciscendi fuisse. Ista parva sunt. Ad eos igitur converte te, quaeso. Haec para doca illi, nos admirabilia dicamus. Universa enim illorum ratione cum tota vestra confligendum puto. Sed ut iis bonis erigimur, quae expectamus, sic laetamur iis, quae recordamur. At hoc in eo Quid de Platone aut de Democrito loquar. Quae quo sunt excelsiores, eo dant clariora indicia naturae. Sed haec quidem liberius ab eo dicuntur et saepius. Et ille ridens. Quis est autem dignus nomine hominis, qui unum diem totum velit esse in genere isto voluptatis. Ad eos igitur convert te, quaeso. Duo Reges: constructio interrete. An est aliquid per se ipsum flagitiosum, etiamsi nulla comitetur infamia. Quid ad utilitatem tantae pecuniae? Duo enim genera quae erant, fecit tria. Et quod est munus, quod opus sapientiae?</p><blockquote><p>Sed in rebus apertissimis nimium longi sumus. Inquit, etsi enim illud erat aptius, aequum cuique concedere.</p></blockquote><p>Atqui reperies, inquit, in hoc quidem pertinacem. Quae quo sunt excelsiores, eo dant clariora indicia naturae. Sed haec quidem liberius ab eo dicuntur et saepius. Et ille ridens: Video, inquit, quid agas; Tum ille timide vel potius verecunde: Facio, inquit. An hoc usque quaque, aliter in vita?</p><p>Omnis virtus, omne decus, omnis vera laus deserenda est. Sed eum qui audiebant, quoad poterant, defendebant sententiam suam. Fatebuntur Stoici haec omnia dicta esse praeclare, neque eam causam Zenoni desciscendi fuisse. Ista parva sunt. Ad eos igitur converte te, quaeso. Haec para doca illi, nos admirabilia dicamus. Universa enim illorum ratione cum tota vestra confligendum puto. Sed ut iis bonis erigimur, quae expectamus, sic laetamur iis, quae recordamur. At hoc in eo Quid de Platone aut de Democrito loquar. Quae quo sunt excelsiores, eo dant clariora indicia naturae. Sed haec quidem liberius ab eo dicuntur et saepius. Et ille ridens. Quis est autem dignus nomine hominis, qui unum diem totum velit esse in genere isto voluptatis. Ad eos igitur convert te, quaeso. Duo Reges: constructio interrete. An est aliquid per se ipsum flagitiosum, etiamsi nulla comitetur infamia. Quid ad utilitatem tantae pecuniae? Duo enim genera quae erant, fecit tria. Et quod est munus, quod opus sapientiae?</p><p>Unum nescio, quo modo possit, si luxuriosus sit, finitas cupiditates habere. Aliter enim explicari, quod quaeritur, non potest. Sed haec quidem liberius ab eo dicuntur et saepius. Atqui reperies, inquit, in hoc quidem pertinacem. Quae quo sunt excelsiores, eo dant clariora indicia naturae. Sed haec quidem liberius ab eo dicuntur et saepius. Et ille ridens: Video, inquit, quid agas; Tum ille timide vel potius verecunde: Facio, inquit. An hoc usque quaque, aliter in vita?</p>', 35, '2023-05-24 15:01:23', 48, '2023-05-24 15:01:23', 0, 'i-work-best-when-my-space-is-filled-with-inspiration'),
(27, 'Comfort and simplicity are two keys', 'Bona autem corporis huic sunt, quod posterius posui, similiora. Quod cum ita sit, perspicuum est omnis rectas res atque laudabilis eo referri, ut cum voluptate vivatur. Atque his de rebus et splendida est eorum et illustris oratio.', '<p>Maec et tu ita posuisti, et verba vestra sunt. Contemnit enim disserendi elegantiam, confuse loquitur. Bona autem corporis huic sunt, quod posterius posui, similiora. Quod cum ita sit, perspicuum est omnis rectas res atque laudabilis eo referri, ut cum voluptate vivatur. Quasi vero aut concedatur in omnibus stultis aeque magna esse vitia, et eadem inbecillitate et inconstantia L. Levatio igitur vitiorum magna fit in iis, qui habent ad virtutem progressionis aliquantum. Tertium autem omnibus aut maximis rebus iis, quae secundum naturam sint, fruentem vivere. Materiam vero rerum et copiam apud hos exilem, apud illos uberrimam reperiemus. Atque his de rebus et splendida est eorum et illustris oratio.</p><blockquote><p>Haec et tu ita posuisti, et verba vestra sunt. Contemnit enim disserendi elegantiam, confuse loquitur.</p></blockquote><p>Bona autem corporis huic sunt, quod posterius posui, similiora. Quod cum ita sit, perspicuum est omnis rectas res atque laudabilis eo referri, ut cum voluptate vivatur. Quasi vero aut concedatur in omnibus stultis aeque magna esse vitia, et eadem inbecillitate et inconstantia L. Levatio igitur vitiorum magna fit in iis, qui habent ad virtutem progressionis aliquantum. Tertium autem omnibus aut maximis rebus iis, quae secundum naturam sint, fruentem vivere. Materiam vero rerum et copiam apud hos exilem, apud illos uberrimam reperiemus. Atque his de rebus et splendida est eorum et illustris oratio. Redarguimus, omnis virtus, omne decus, omnis vera laus deserenda est. Sed eum qui audiebant, quoad poterant, defendebant sententiam suam. Fatebuntur Stoici haec omnia dicta esse praeclare, neque eam causam Zenoni desciscendi fuisse. Quis est autem dignus nomine hominis, qui unum diem totum velit esse in genere isto voluptatis. Ad eos igitur convert te, quaeso. Duo Reges: constructio interrete. An est aliquid per se ipsum flagitiosum, etiamsi nulla comitetur infamia. Quid ad utilitatem tantae pecuniae? Duo enim genera quae erant, fecit tria. Et quod est munus, quod opus sapientiae? Sed in rebus apertissimis nimium longi sumus. Quasi vero aut concedatur in omnibus stultis aeque magna esse vitia, et eadem inbecillitate et inconstantia.</p><p>Quasi vero aut concedatur in omnibus stultis aeque magna esse vitia, et eadem inbecillitate et inconstantia L. Levatio igitur vitiorum magna fit in iis, qui habent ad virtutem progressionis aliquantum. Tertium autem omnibus aut maximis rebus iis, quae secundum naturam sint, fruentem vivere. Materiam vero rerum et copiam apud hos exilem, apud illos uberrimam reperiemus. Atque his de rebus et splendida est eorum et illustris oratio.</p><blockquote><p>Atque his de rebus et splendida est eorum et illustris oratio.</p></blockquote><p>Age, inquies, ista parva sunt. Ad eos igitur converte te, quaeso. Haec doca illi, nos admirabilia dicamus. Universa enim illorum ratione cum tota vestra confligendum puto.</p><p>Quasi vero aut concedatur in omnibus stultis aeque magna esse vitia, et eadem inbecillitate et inconstantia L. Levatio igitur vitiorum magna fit in iis, qui habent ad virtutem progressionis aliquantum. Tertium autem omnibus aut maximis rebus iis, quae secundum naturam sint, fruentem vivere. Materiam vero rerum et copiam apud hos exilem, apud illos uberrimam reperiemus. Atque his de rebus et splendida est eorum et illustris oratio.</p><h3>Quos redarguimus</h3><p>Omnis virtus, omne decus, omnis vera laus deserenda est. Sed eum qui audiebant, quoad poterant, defendebant sententiam suam. Fatebuntur Stoici haec omnia dicta esse praeclare, neque eam causam Zenoni desciscendi fuisse. Quis est autem dignus nomine hominis, qui unum diem totum velit esse in genere isto voluptatis. Ad eos igitur convert te, quaeso. Duo Reges: constructio interrete. An est aliquid per se ipsum flagitiosum, etiamsi nulla comitetur infamia. Quid ad utilitatem tantae pecuniae? Duo enim genera quae erant, fecit tria. Et quod est munus, quod opus sapientiae? Sed in rebus apertissimis nimium longi sumus. Quasi vero aut concedatur in omnibus stultis aeque magna esse vitia, et eadem inbecillitate et inconstantia L. Levatio igitur vitiorum magna fit in iis, qui habent ad virtutem progressionis aliquantum. Tertium autem omnibus aut maximis rebus iis, quae secundum naturam sint, fruentem vivere. Materiam vero rerum et copiam apud hos exilem, apud illos uberrimam reperiemus. Atque his de rebus et splendida est eorum et illustris oratio.</p>', 36, '2023-05-24 15:08:02', 48, '2023-05-24 15:08:02', 0, 'comfort-and-simplicity-are-two-keys'),
(38, 'New post', 'description', '<p>hello</p>', 31, '2023-05-27 14:45:47', 48, '2023-05-27 14:45:47', 0, 'new-post');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(20) NOT NULL DEFAULT 'user',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `avatar` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `role`, `createdAt`, `updatedAt`, `avatar`) VALUES
(48, 'admin', 'admin@email.com', '$2a$10$/S8LJlbo/As5WdSE6O94cO6Oe4htq1RpBd6A2NA8Hnye.wlx3YBgi', 'admin', '2023-05-06 14:49:44', '2023-05-16 15:06:45', 22),
(50, 'user1', 'user1@email.com', '$2a$10$b98h25f0yZEqPLQWYvZH4OhcchKGA/IChWcaiXAOojrYz5m27jnqK', 'user', '2023-05-08 13:49:52', '2023-05-08 13:49:52', 0),
(51, 'admin@email.com', 'mailcuahungban@gmail.com', '$2a$10$5fVEmNcnSKk/ZsVQCWdwsOi1nSfWYaerLq5EhUZoF7DXA6.DGJHQ.', 'user', '2023-05-09 12:07:28', '2023-05-09 12:07:28', 0),
(52, 'user11', 'user11@email.com', '$2a$10$lLDgWoNTU34M94HgyONi1uQBWRT4MMY.t6FH0n/3B8AisiLUabDza', 'user', '2023-05-09 13:13:46', '2023-05-09 13:13:46', 0),
(54, 'root', 'root@email.com', '$2a$10$H6/Gx.HbOJuAiL92S3lbSu67SuROGeNELTSJDOK3ZBXIPKPBilC76', 'admin', '2023-05-15 18:03:32', '2023-05-15 18:07:17', 0),
(55, 'test', 'test@mail.com', '$2a$10$r7QiOa/PgLRus5YjtvQgE.b9gDIN30tuXIGbCd2wy376H0BULaklG', 'user', '2023-05-27 14:42:10', '2023-05-27 14:42:10', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `title` (`title`);

--
-- Indexes for table `category_lookup`
--
ALTER TABLE `category_lookup`
  ADD KEY `postsId` (`postId`),
  ADD KEY `categoiresId` (`categoryId`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `uploadBy` (`uploadBy`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `url` (`url`),
  ADD UNIQUE KEY `title` (`title`),
  ADD KEY `author` (`author`),
  ADD KEY `image` (`image`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;
--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `images`
--
ALTER TABLE `images`
  ADD CONSTRAINT `images_ibfk_1` FOREIGN KEY (`uploadBy`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
