// Analytics Cards imports
import { UilUsdSquare, UilMoneyWithdrawal, UilHourglass, UilBox, UilTruck, UilCheckCircle, UilExclamationTriangle , UilFrown } from "@iconscout/react-unicons";

// Analytics Cards Dat
export const cardsData = [
  {
    title: "En attente",
    color: {
      backGround: "linear-gradient(180deg, #FFA500 0%, #FF8C00 100%)",
      boxShadow: "0px 10px 20px 0px #FFC04D",
    },
    barValue: 70,
    value: "25,970",
    png: UilHourglass,
    status: "En attente"
  },
  {
    title: "Au dépôt",
    color: {
      backGround: "linear-gradient(180deg, #87CEEB 0%, #00BFFF 100%)",
      boxShadow: "0px 10px 20px 0px #ADD8E6",
    },
    barValue: 70,
    value: "25,970",
    png: UilBox,
    status: "Au dépôt"
  },
  {
    title: "Rtn dépôt",
    color: {
      backGround: "linear-gradient(180deg, #87CEEB 30%, #FF4D4D 100%)",
      boxShadow: "0px 10px 20px 0px #FF4D4D",
    }
    ,    
    barValue: 60,
    value: "4,270",
    png: UilBox,
    status: "Rtn dépôt",
  },
  {
    title: "En cours",
    color: {
      backGround: "linear-gradient(180deg, #bb67ff 0%, #00BFFF 0%, #90EE90 90%)",
      boxShadow: "0px 10px 20px 0px rgba(144, 238, 144, 0.5)",
    },
    barValue: 70,
    value: "25,970",
    png: UilTruck,
    status: "En cours",
  },
  {
    title: "Livrés",
    color: {
      backGround: "linear-gradient(180deg, #77dd77 0%, #33cc33 100%)",
      boxShadow: "0px 10px 20px 0px #99ff99",
    },
    barValue: 70,
    value: "25,970",
    png: UilUsdSquare,
    status: "Livrés",
  },
  {
    title: "Livrés payés",
    color: {
      backGround: "linear-gradient(180deg, #006400 0%, #008000 100%)",
      boxShadow: "0px 10px 20px 0px #006400",
    }
    ,
    barValue: 70,
    value: "25,970",
    png: UilMoneyWithdrawal,
    status: "Livrés payés",
  },
  {
    title: "À vérifier",
    color: {
      backGround: "linear-gradient(180deg, #FFD700 0%, #FF8C00 100%)",
      boxShadow: "0px 10px 20px 0px #FFA500",
    },
    barValue: 80,
    value: "14,270",
    png: UilCheckCircle,
    status: "À vérifier",
  },
  {
    title: "R définitif",
    color: {
      backGround: "linear-gradient(180deg, #FF6B6B 0%, #FF4040 100%)",
      boxShadow: "0px 10px 20px 0px #FFAFAF",
    },
    barValue: 70,
    value: "25,970",
    png: UilExclamationTriangle ,
    status: "R définitif",
  },
  {
    title: "R expéditeur",
    color: {
      backGround: "linear-gradient(180deg, #8B0000 0%, #800000 100%)",
      boxShadow: "0px 10px 20px 0px #A52A2A",
    },
    barValue: 70,
    value: "25,970",
    png: UilFrown,
    status: "R expéditeur"
  },
];

//===================================================================================================================
export const location = {
  "": "",
  "Ariana": ['', 'Ariana Ville', 'Charguia', 'Cité Attadhamon', 'Ennasr', 'Kalâat Andalous', 'Mnihla', 'Raouède', 'Sidi Thabet', 'Soukra'],
  "Béja": ['', 'Amdoun', 'Béja', 'Goubellat', 'Mejez El Bab', 'Nefza', 'Teboursouk', 'Testour', 'Tibar'],
  "Ben Arous": ['', 'Ben Arous', 'Boumhel Bassatine', 'El Mourouj', 'Ezzahra', 'Fouchana', 'Hammam Chatt', 'Hammam Lif', "M'hamdia", 'Megrine', 'Mornag', 'Nouvelle Médina', 'Radès'],
  "Bizerte": ['', 'Bizerte Nord', 'Bizerte Sud', 'El Alia', 'Ghar El Melh', 'Ghezala', 'Jarzouna', 'Joumine', 'Mateur', 'Menzel Bourguiba', 'Menzel Jemil', 'Ras Jebel', 'Sejnane', 'Tinja', 'Utique'],
  "El Kef": ['', 'Dahmani', 'Gsour', 'Jerissa', 'Kalâa El khasba', 'Kalâat sinane', 'Kef Est', 'Kef Ouest', 'Le Sers', 'Nebeur', 'Sakiet Sidi Youssef', 'Tejerouine'],
  "Gabes": ['', 'Gabès ouest', 'Gabès sud', 'Gabès ville', 'Ghannouch', 'Hamma', 'Mareth', 'Matmata', 'Matmata nouvelle', 'Menzel habib', 'Metouia'],
  "Gafsa": ['', 'Belkhir', 'El Guettar', 'El Ksar', 'El Mdhilla', 'Gafsa Nord', 'Gafsa Sud ', 'Métlaoui', 'Moulares', 'Redyef', 'Sidi Aich', 'Sned'],
  "Jendouba": ['', 'Ain Drahem', 'Balta Bouaouene', 'Boussalem', 'Fernana', 'Ghardimaou', 'Jendouba', 'Jendouba Nord', 'Oued Mliz', 'Tabarka'],
  "Kairouan": ['', 'Bouhajla', 'Chebika', 'Cherarda', 'El Ala', 'Haffouz', 'Hajeb El Ayoun', 'Kairouan Nord', 'Kairouan Sud', 'Nasrallah', 'Oueslatia', 'Sebikha'],
  "Kesserine": ['', 'El Ayoun', 'Ezzouhour', 'Feriana', 'Foussana', 'Hassi ferid', 'Hidra', 'Jedliane', 'Kasserine Nord', 'Kasserine Sud', 'Mejel Bel Abbes', 'Sbiba', 'Sbitla', 'Tela'],
  "Kebili": ['', 'Douz nord', 'Douz sud', 'El Faouar', 'Kébili Nord', 'Kébili Sud', 'Souk El Ahad'],
  "Mahdia": ['', 'Boumerdes', 'Chebba', 'Chorbane', 'Eljem', 'Hbira', 'Ksour Essef', 'Mahdia', 'Malloulech', 'Ouled Chamekh', 'Sidi Alouane', 'Souassi'],
  "Manouba": ['', 'Battan', 'Borj Amri', 'Douar Hicher', 'Jedaida', 'Manouba', 'Mornaguia', 'Oued Ellil', 'Tebourba'],
  "Medenine": ['', 'Ben Guerdene', 'Béni khedach', 'Jerba Ajim', 'Jerba Houmet Souk', 'Jerba Midoun', 'Mednine Nord', 'Mednine Sud', 'Sidi Makhlouf', 'Zazis'],
  "Monastir": ['', 'Bekalta', 'Benbla', 'Béni Hassan', 'Bouhjar', 'Jammel', 'Ksar Helal', 'Ksibet Medyouni', 'Lamta', 'Moknine', 'Monastir', 'Ouerdanine', 'Sahline', 'Sayada', 'Teboulba', 'Zéramdine'],
  "Nabeul": ['', 'Béni Khalled', 'Béni Khiar', 'Bouârgoub', 'Dar Chaâbane Elfehri', 'Grombalia', 'Hammam Ghezaz', 'Hammamet', 'Haouaria', 'Kelibia', 'Korba', 'Menzel Bouzelfa', 'Menzel Temime', 'Mida', 'Nabeul', 'Slimane', 'Takelsa'],
  "Sfax": ['', 'Agareb', 'Bir Ali Ben Khelifa', 'El Amra', 'El Hencha', 'Ghraiba', 'Jebeniana', 'Kerkennah', 'Mahrès', 'Menzel chaker', 'Sakiet Eddaier', 'Sakiet Ezzit', 'Sekhira', 'Sfax Ouest', 'Sfax Sud', 'Sfax Ville', 'Tina'],
  "Sidi Bouzid": ['', 'Bir Hfay', 'Jelma', 'Meknassi', 'Menzel Bouzayane', 'Mezouna', 'Ouled Haffouz', 'Regueb', 'Sabbalet Ouled Askar', 'Sidi Ali Benôun', 'Sidi Bouzid Est', 'Sidi Bouzid Ouest', 'Souk Jedid'],
  "Siliana": ['', 'Bargou', 'Bouarada', 'Bourouis', 'El Aroussa', 'Gâafour', 'Kesra', 'Le Krib', 'Makther', 'Rouhia', 'Siliana nord', 'Siliana sud'],
  "Sousse": ['', 'Akouda', 'Bouficha', 'Enfidha', 'Hammam sousse', 'Hergla', 'Kalâa Elkébira', 'Kalâa Ességhira', 'Koundar', 'Msaken', 'Sidi Bouali', 'Sidi Elheni', 'Sousse Jawhara', 'Sousse Ryadh', 'Sousse Sidi Abdelhamid', 'Sousse Ville', 'Zaouia Ksiba Thrayat'],
  "Tataouine": ['', 'Bir Lahmer', 'Dhehiba', 'Ghomrassen', 'Remada', 'Smar', 'Tataouine Nord', 'Tataouine Sud'],
  "Tozeur": ['', 'Degueche', 'Hezoua', 'Nefta', 'Tameghza', 'Tozeur'],
  "Tunis": ['', 'Alhrairia', 'Attahrir', 'Azzouhour', 'Bab Bhar', 'Bab Souika', 'Bardo', 'Carthage', 'Cité Alkhadhra', 'El Menzah', 'Jebel Jelloud', 'Kabaria', 'La Goulette', 'La Marsa', 'La Médina', 'Le Kram', 'Omrane', 'Omrane Supérieur', 'Ouardia', 'Séjoumi', 'Sidi Elbéchir', 'Sidi Hsine'],
  "Zaghouan": ['', 'Bir Mecharga', 'Fahs', 'Nadhour', 'Saouaf', 'Zaghouan', 'Zériba']
}
