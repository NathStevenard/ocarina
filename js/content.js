/* ============================================================
   OCARINA — content.js
   Dictionnaire de toutes les chaînes de texte statique du site,
   groupées par section (préfixes nav_, inst_, hero_, contexte_,
   projet_, methodo_, equipe_, pub_, actu_, footer_).

   - Les valeurs contenant du HTML inline (liens <a>, <em>, <sub>,
     <sup>...) sont injectées via innerHTML par setLanguage() dans
     main.js.
   - Les clés suffixées _alt / _title / _aria correspondent aux
     attributs alt / title / aria-label traduits via data-i18n-alt,
     data-i18n-title, data-i18n-aria dans index.html.
   - "en" est pour l'instant un placeholder identique à "fr" partout :
     aucune vraie traduction anglaise n'a encore été fournie. Les noms
     propres et le texte légal du footer sont volontairement identiques
     dans les deux langues (voir commentaires ci-dessous).
   ============================================================ */

const content = {
  fr: {
    // ---------- Nav ----------
    nav_brand: `OCARINA`,
    nav_eu_flag_aria: `Drapeau de l'Union européenne`,
    nav_eu_flag_title: `Projet financé par l'Union européenne`,
    nav_projet: `Le projet`,
    nav_methodologie: `Méthodologie`,
    nav_equipe: `Équipe`,
    nav_publications: `Publications`,
    nav_actualites: `Actualités`,
    nav_aria: `Navigation principale`,
    nav_lang_aria: `Langue`,
    nav_contact: `Contact`,

    // ---------- Bandeau institutionnel ----------
    inst_aria: `Financement et institution d'accueil`,
    inst_uclouvain_logo_alt: `Logo UCLouvain`,
    inst_eli_logo_alt: `Logo Earth and Life Institute`,
    inst_funded_text: `Financé par l'Union européenne — MSCA`,
    inst_uclouvain_eli_text: `UCLouvain — Earth & Life Institute`,

    // ---------- Hero (3 bandes) ----------
    hero_core_photo_alt: `Carotte de sédiment marin prélevée lors de la mission AMARYLLIS-AMAGAS, montrant les strates sédimentaires successives.`,
    hero_core_credit: `© Anaïs Duhayon — mission AMARYLLIS-AMAGAS`,
    hero_video_fallback: `Votre navigateur ne prend pas en charge la lecture vidéo intégrée.`,
    hero_video_credit: `NASA/Goddard Space Flight Center Scientific Visualization Studio — modèle ECCO2 (NASA/JPL)`,
    hero_title: `OCARINA relie les <em>données</em> et les <em>modèles</em> pour reconstruire l'océan profond du passé.`,
    hero_text: `En intégrant des reconstructions haute résolution de température de surface et de ventilation des eaux
          profondes dans le modèle climatique LOVECLIM par assimilation de données, le projet livre la
          première simulation, contrainte par des reconstructions, de la circulation méridienne
          de retournement atlantique (AMOC) durant les interglaciaires chauds MIS 7e et 9e.`,
    hero_cta_projet: `Découvrir le projet`,
    hero_cta_methodo: `Voir la méthodologie →`,

    // ---------- Section Contexte / timeline ----------
    contexte_eyebrow: `Contexte`,
    contexte_title: `800 000 ans de climat, deux fenêtres d'étude, un présent déjà hors norme.`,
    contexte_text: `Les MIS 7e et MIS 9e comptent parmi les périodes les plus chaudes des derniers 800 000 ans,
          portées par des forçages distincts, orbital pour l'une, CO<sub>2</sub> pour l'autre. Elles offrent des analogues
          naturels pour comprendre la sensibilité de l'AMOC, alors que le CO<sub>2</sub> actuel dépasse déjà tout ce que ces
          interglaciaires ont connu.`,
    contexte_stat1_value: `800 000 ans`,
    contexte_stat1_label: `de couverture climatique`,
    contexte_stat2_value: `MIS 7e & 9e`,
    contexte_stat2_label: `fenêtres d'étude`,
    contexte_stat3_value: `1ère réanalyse`,
    contexte_stat3_label: `avantage des reconstructions et modèlisations`,
    contexte_svg_aria: `Schéma d'évolution du CO2 et de la température sur 800 000 ans, mettant en évidence MIS 7e, MIS 9e et le pic actuel`,
    contexte_caption: `Courbe de CO<sub>2</sub> atmosphérique reconstruit à partir de carottes de glace, échelle d'âge AICC2012. Source : Bereiter et al. (2015).`,
    // Utilisés par buildTimelineSvg() (JS), pas par un [data-i18n] direct.
    timeline_error: `Impossible de charger les données CO2 — voir la console.`,
    timeline_today: `Aujourd'hui`,

    // ---------- Section "Le projet" ----------
    projet_identity_eyebrow: `MSCA Postdoctoral Fellowship 2025`,
    projet_identity_title: `OCARINA`,
    // Déjà en anglais par nature (développement de l'acronyme) : identique fr/en.
    projet_identity_acronym: `Ocean Circulation AcRoss Interglacials and deglacIatioNs through a reAnalysis framework`,
    projet_identity_text: `Ce projet a été lauréat de l'appel MSCA Postdoctoral Fellowships 2025 de l'Union
          européenne, et est hébergé à l'Earth and Life Institute de l'UCLouvain.`,
    projet_identity_logo_alt: `Logo — Financé par l'Union européenne`,
    projet_innovation_text: `OCARINA innove en couplant pour la première fois les données de température de surface de l'eau
      (SST) et les traceurs de ventilation des eaux profondes (δ<sup>13</sup>C) au sein d'un même cadre
      d'assimilation. Contrairement aux approches 'hors ligne' couramment utilisées en
      paléoclimatologie, l'assimilation 'en ligne' met à jour le modèle en cours de
      simulation. Cela garantit un ajustement (en surface comme en profondeur) de la simulation
      à pas de temps réguliers, permettant de garder la physique du modèle pendant l'assimilation.`,

    projet_ro1_eyebrow: `Objectif 1`,
    projet_ro1_title: `Évaluer le modèle, avec et sans assimilation`,
    projet_ro1_text: `Nous comparerons les simulations LOVECLIM avec et sans assimilation en
          ligne, pour établir un point de référence et mesurer précisément ce que l'assimilation
          apporte à la représentation de la circulation profonde.`,
    projet_ro1_img_alt: `Illustration humoristique d'un chercheur comparant deux cartes mondiales de température de surface affichées sur deux écrans, sous le titre « Spot the differences », symbolisant la comparaison entre simulations avec et sans assimilation.`,

    projet_ro2_eyebrow: `Objectif 2`,
    projet_ro2_title: `Produire la première réanalyse en ligne d'un interglaciaire`,
    projet_ro2_text: `En intégrant en temps réel les données de SST et de δ<sup>13</sup>C
          dans le modèle, OCARINA construit la première reconstruction dynamiquement
          cohérente de la circulation océanique profonde pour le MIS 7e ou MIS 9e et
          leur déglaciation associée.`,
    projet_ro2_img_alt: `Illustration humoristique d'un chercheur poussant physiquement les mots « model » et « Data » l'un contre l'autre dans un écran, symbolisant le couplage des données dans le modèle par assimilation.`,

    projet_ro3_eyebrow: `Objectif 3`,
    projet_ro3_title: `Identifier les mécanismes physiques des variations de l'AMOC`,
    projet_ro3_text: `À partir de la réanalyse, nous cherchons à isoler les mécanismes responsables
          des grands changements de circulation, comme le retrait de la banquise, les gradients de
          densité, le régimes de vents. Cela permettra de mieux comprendre leur sensibilité aux
          forçages radiatifs naturels et de mieux anticiper son évolution future.`,
    projet_ro3_img_alt: `Illustration humoristique d'un chercheur pensif face à un écran affichant plusieurs graphiques scientifiques (anomalies de température, précipitations, rétroaction nuageuse, bilan énergétique) et une liste de mécanismes physiques possibles, symbolisant la recherche des mécanismes responsables des variations climatiques.`,
    projet_ro_ai_credit: `Illustration générée par IA (OpenAI)`,

    // ---------- Section "Méthodologie" ----------
    methodo_data_eyebrow: `Les données`,
    methodo_data_title: `Deux synthèses inédites, déjà publiées`,
    methodo_data_text: `OCARINA s'appuie sur deux synthèses de température de surface de l'océan (SST) que j'ai
        réalisées durant mon précédent postdoctorat, couvrant le MIS 9
        (<a href="https://doi.org/10.5194/cp-21-1895-2025" target="_blank" rel="noopener">Stevenard et al., 2025</a>)
        et le MIS 7
        (<a href="https://doi.org/10.5194/cp-22-1223-2026" target="_blank" rel="noopener">Legrain et al., 2026</a>).
        Les enregistrements ont été harmonisés sur la chronologie de précision basée sur les travaux
        de carottes de glace Antarctique (AICC2023), recalibrés selon une approche bayésienne ou Monte
        Carlo commune à chaque proxy, et exprimés en anomalies de température par rapport à la
        période pré-industrielle (ici, 1870-1899 CE). Les données de δ<sup>13</sup>C, qui documentent
        la ventilation des eaux profondes, ne sont pas encore publiées mais seront
        compilées aux mêmes sites que les SST, avec toutefois une couverture plus restreinte.`,
    methodo_data_pros_label: `Points forts`,
    methodo_data_pros_1: `Mesures directes (« vérité terrain »)`,
    methodo_data_pros_2: `Reconstructions fiables une fois recalibrés`,
    methodo_data_pros_3: `Incertitudes bien quantifiées`,
    methodo_data_cons_label: `Limites`,
    methodo_data_cons_1: `Couverture géographique inégale et localisée`,
    methodo_data_cons_2: `Résolution temporelle parfois limitée`,
    methodo_data_cons_3: `Certaines mesures issues de campagnes de laboratoire anciennes et hétérogènes`,
    methodo_data_map_alt: `Carte de localisation des sites de la synthèse de température de surface MIS 9, points de données colorés sur fond de contours continentaux clairs.`,
    methodo_data_caption: `Localisation des enregistrements de la synthèse MIS 9. Figure adaptée de
          Stevenard et al. (2025), Climate of the Past.`,

    methodo_model_eyebrow: `Le modèle`,
    methodo_model_title: `LOVECLIM : modèle de complexité intermédiaire`,
    methodo_model_text: `OCARINA s'appuie sur LOVECLIM, un modèle climatique de complexité intermédiaire
        (EMIC). Sa rapidité (environ 250 années simulées par jour sur un seul
        processeur) rend possible ce qu'aucun modèle complet ne permet à ce coût :
        faire tourner de larges ensembles de simulations sur des échelles de temps
        multi-millénaires, tout en conservant les rétroactions climatiques essentielles
        entre océan, atmosphère et glace de mer.`,
    methodo_model_pros_label: `Points forts`,
    methodo_model_pros_1: `Simulations rapides (~250 ans simulés/jour)`,
    methodo_model_pros_2: `Permet de grands ensembles sur des échelles multi-millénaires`,
    methodo_model_pros_3: `Conserve les rétroactions océan-atmosphère-glace essentielles`,
    methodo_model_cons_label: `Limites`,
    methodo_model_cons_1: `Résolution et physique plus grossières qu'un modèle complet`,
    methodo_model_cons_2: `Certains processus fins (tourbillons, échelle régionale) ne sont pas résolus`,
    methodo_model_cons_3: `Résultats parfois différents des reconstructions`,

    methodo_assim_eyebrow: `L'assimilation`,
    methodo_assim_title: `Le meilleur des deux mondes`,
    methodo_assim_text: `Un filtre particulaire fait tourner plusieurs dizaines de simulations en
        parallèle appelées « particules », qui représentent chacune une trajectoire possible du climat.
        À intervalles réguliers, chaque particule est comparée aux données réelles
        disponibles (SST, δ<sup>13</sup>C) : celles qui s'en approchent le plus voient leur poids
        augmenter, les autres sont progressivement éliminées et remplacées. Se
        concentrer sur un seul modèle plutôt que plusieurs permet justement de produire
        facilement ces grands ensembles en ligne, condition indispensable au filtre
        particulaire. Résultat : une reconstruction qui a la couverture globale et la
        cohérence physique d'un modèle, mais contrainte à chaque étape par la réalité
        des reconstructions.`,
    methodo_assim_obs_alt: `Carte des observations de température de surface disponibles à un instant donné, points de mesure épars sur fond transparent.`,
    methodo_assim_model_alt: `Carte de l'ensemble des simulations du modèle LOVECLIM avant assimilation, montrant la dispersion des trajectoires possibles.`,
    methodo_assim_weighted_alt: `Carte de l'ensemble de simulations repondéré après assimilation des observations, la dispersion des trajectoires étant resserrée autour des données réelles.`,

    methodo_outro: `Suivez le déroulé du projet au fil de l'eau sur la page
      <a href="#actualites">Actualités</a> !`,

    // ---------- Section "Équipe" ----------
    equipe_encadrement_eyebrow: `Encadrement du projet`,
    equipe_site_link: `Site personnel →`,

    equipe_nathan_name: `Nathan Stevenard`,
    equipe_nathan_role: `Porteur du projet — MSCA Postdoctoral Fellow`,
    equipe_nathan_bio: `Nathan Stevenard est chercheur postdoctoral à l'UCLouvain et porte le
              projet OCARINA. Spécialiste de la reconstruction de la circulation
              océanique passée à partir de carottes sédimentaires, il a mené des
              recherches en paléocéanographie en France et en Belgique, combinant
              mesures de terrain, compilations de données et modélisation climatique.`,
    equipe_nathan_photo_alt: `Portrait de Nathan Stevenard`,

    equipe_hugues_name: `Hugues Goosse`,
    equipe_hugues_role: `Superviseur principal — ELIC, UCLouvain`,
    equipe_hugues_bio: `Hugues Goosse fait partie de l'équipe Earth and Climate (ELIC) à
              l'UCLouvain et co-encadre OCARINA. Figure reconnue de l'assimilation de
              données en paléoclimatologie, il a co-développé les modèles LOVECLIM et
              NEMO et contribué à plusieurs groupes de travail, notamment PMIP,
              PAGES ou le GIEC. Auteur de plus de 230 articles scientifiques, il a
              encadré une cinquantaine d'étudiants en master et une trentaine de
              doctorants et post-doctorants.`,
    equipe_hugues_photo_alt: `Portrait de Hugues Goosse`,

    equipe_collab_eyebrow: `Collaborateurs externes`,

    equipe_collab1_name: `Qiuzhen Yin`,
    equipe_collab1_affiliation: `UCLouvain, Belgique`,
    equipe_collab1_expertise: `Modélisation des interglaciaires et dynamique océanique avec LOVECLIM`,

    equipe_collab2_name: `Claire Waelbroeck`,
    equipe_collab2_affiliation: `CNRS, LOCEAN, France`,
    equipe_collab2_expertise: `Dynamique océanique et assimilation de données avec des modèles de complexité intermédiaire`,

    equipe_collab3_name: `Emilie Capron`,
    equipe_collab3_affiliation: `CNRS, IGE, France`,
    equipe_collab3_expertise: `Harmonisation des proxys paléoclimatiques et reconstructions des interglaciaires`,

    equipe_collab4_name: `Laurie Menviel`,
    equipe_collab4_affiliation: `UNSW, Australie`,
    equipe_collab4_expertise: `Circulation océanique, paléoclimat et modélisation isotopique`,

    // ---------- Section "Publications" ----------
    pub_eyebrow: `Publications`,
    pub_title: `Les publications du projet arrivent bientôt`,
    pub_text: `Le projet démarre prochainement : les publications associées au projet OCARINA seront
        ajoutées ici au fur et à mesure. En attendant, mes travaux antérieurs
        sont disponibles sur
        <a href="https://scholar.google.com/citations?user=fk7YLYIAAAAJ&amp;hl=fr&amp;oi=ao" target="_blank" rel="noopener">Google Scholar</a>
        et
        <a href="https://orcid.org/0000-0002-1838-9291" target="_blank" rel="noopener">ORCID</a>.`,

    // ---------- Section "Actualités" ----------
    actu_eyebrow: `Actualités`,
    actu_title: `Le fil du projet`,
    actu_intro_text: `Les avancées scientifiques, rencontres et interventions publiques sont ajoutées au fil de l'eau.`,
    // Conservé pour la réactivation de l'état vide entre deux publications
    // (voir le bloc commenté .news-empty dans index.html).
    actu_empty_text: `Rien à afficher pour l'instant : les premières actualités seront publiées bientôt.`,

    // Actualité 1 — Premier jour à l'ELIC (septembre 2026)
    actu_post1_date: `Septembre 2026`,
    actu_post1_tag: `Avancée du projet`,
    actu_post1_title: `Premier jour à l'ELIC`,
    actu_post1_text: `Le 1er septembre marque le vrai début d'OCARINA : plaque sur la porte du bureau B.480,
        et quelques journées bien chargées en paperasse administrative avant de plonger dans la
        vraie science. Merci à l'Union européenne et au programme Marie Skłodowska-Curie (MSCA)
        pour la confiance, et à Hugues Goosse pour l'accueil au sein de l'équipe ELIC. Les
        premières simulations de référence démarrent dans les prochaines semaines — la suite ici !`,
    actu_post1_img_alt: `Plaque de bureau indiquant « B.480 — Nathan Stevenard, Earth & Climate - ELIC ».`,

    // ---------- Footer ----------
    footer_brand: `OCARINA`,
    footer_uclouvain_logo_alt: `Logo UCLouvain`,
    footer_eli_logo_alt: `Logo Earth and Life Institute`,
    footer_address: `Earth and Life Institute — UCLouvain<br>Louvain-la-Neuve, Belgique`,
    footer_contact_label: `Contact`,
    footer_funding_logo_alt: `Logo — Funded by the European Union`,
    // Texte légal officiel imposé (Horizon Europe) : jamais traduit, identique fr/en.
    footer_funding_text: `Funded by the European Union. Views and opinions expressed are however
        those of the author(s) only and do not necessarily reflect those of the
        European Union or the European Research Executive Agency (REA). Neither
        the European Union nor the granting authority can be held responsible
        for them.`,
    footer_ai_credit: `Ce site a été conçu avec l'assistance de Claude (Anthropic).`
  },

    en: {
    nav_brand: `OCARINA`,
    nav_eu_flag_aria: `European Union flag`,
    nav_eu_flag_title: `Project funded by the European Union`,
    nav_projet: `The project`,
    nav_methodologie: `Methodology`,
    nav_equipe: `Team`,
    nav_publications: `Publications`,
    nav_actualites: `News`,
    nav_aria: `Main navigation`,
    nav_lang_aria: `Language`,
    nav_contact: `Contact`,

    inst_aria: `Funding and host institution`,
    inst_uclouvain_logo_alt: `UCLouvain logo`,
    inst_eli_logo_alt: `Earth and Life Institute logo`,
    inst_funded_text: `Funded by the European Union — MSCA`,
    inst_uclouvain_eli_text: `UCLouvain — Earth & Life Institute`,

    hero_core_photo_alt: `Marine sediment core collected during the AMARYLLIS-AMAGAS mission, showing the successive sedimentary layers.`,
    hero_core_credit: `© Anaïs Duhayon — AMARYLLIS-AMAGAS cruise`,
    hero_video_fallback: `Your browser does not support embedded video playback.`,
    hero_video_credit: `NASA/Goddard Space Flight Center Scientific Visualization Studio — ECCO2 model (NASA/JPL)`,
    hero_title: `OCARINA links <em>data</em> and <em>models</em> to reconstruct the deep ocean of the past.`,
    hero_text: `By integrating high-resolution reconstructions of sea surface temperature and deep-water
          ventilation into the LOVECLIM climate model through data assimilation, the project delivers
          the first reconstruction-constrained simulation of the Atlantic Meridional Overturning
          Circulation (AMOC) during the warm MIS 7e and 9e interglacials.`,
    hero_cta_projet: `Discover the project`,
    hero_cta_methodo: `See the methodology →`,

    contexte_eyebrow: `Context`,
    contexte_title: `800,000 years of climate, two windows of study, a present already off the charts.`,
    contexte_text: `MIS 7e and MIS 9e are among the warmest periods of the last 800,000 years, driven by
          distinct forcings: orbital for one, CO<sub>2</sub> for the other. They offer natural analogues for
          understanding AMOC sensitivity, at a time when present-day CO<sub>2</sub> already exceeds anything
          these interglacials have experienced.`,
    contexte_stat1_value: `800,000 years`,
    contexte_stat1_label: `of climate coverage`,
    contexte_stat2_value: `MIS 7e & 9e`,
    contexte_stat2_label: `study windows`,
    contexte_stat3_value: `1<sup>st</sup> reanalysis`,
    contexte_stat3_label: `combining reconstructions and modelling`,
    contexte_svg_aria: `Diagram of CO2 and temperature evolution over 800,000 years, highlighting MIS 7e, MIS 9e and the present-day peak`,
    contexte_caption: `Atmospheric CO<sub>2</sub> curve reconstructed from ice cores, AICC2012 age scale. Source: Bereiter et al. (2015).`,
    timeline_error: `Unable to load CO2 data — see console.`,
    timeline_today: `Today`,

    projet_identity_eyebrow: `MSCA Postdoctoral Fellowship 2025`,
    projet_identity_title: `OCARINA`,
    projet_identity_acronym: `Ocean Circulation AcRoss Interglacials and deglacIatioNs through a reAnalysis framework`,
    projet_identity_text: `This project was selected under the European Union's MSCA Postdoctoral
          Fellowships 2025 call, and is hosted at the Earth and Life Institute, UCLouvain.`,
    projet_identity_logo_alt: `Logo — Funded by the European Union`,
    projet_innovation_text: `OCARINA innovates by coupling, for the first time, sea surface temperature
      (SST) data with deep-water ventilation tracers (δ<sup>13</sup>C) within a single assimilation
      framework. Unlike the 'offline' approaches commonly used in paleoclimatology, 'online'
      assimilation updates the model as the simulation runs. This ensures the simulation is
      adjusted, at the surface as well as at depth, at regular time steps, while preserving the
      model's physics throughout assimilation.`,

    projet_ro1_eyebrow: `Objective 1`,
    projet_ro1_title: `Evaluate the model, with and without assimilation`,
    projet_ro1_text: `We will compare LOVECLIM simulations with and without online assimilation, to
          establish a baseline and precisely measure what assimilation adds to the representation of
          deep circulation.`,
    projet_ro1_img_alt: `Humorous illustration of a researcher comparing two world maps of sea surface temperature shown on two screens, under the caption "Spot the differences", symbolising the comparison between simulations with and without assimilation.`,

    projet_ro2_eyebrow: `Objective 2`,
    projet_ro2_title: `Produce the first online reanalysis of an interglacial`,
    projet_ro2_text: `By integrating SST and δ<sup>13</sup>C data into the model in real time, OCARINA
          builds the first dynamically consistent reconstruction of deep ocean circulation for MIS 7e
          or MIS 9e and their associated deglaciation.`,
    projet_ro2_img_alt: `Humorous illustration of a researcher physically pushing the words "model" and "Data" into each other on a screen, symbolising the coupling of data into the model through assimilation.`,

    projet_ro3_eyebrow: `Objective 3`,
    projet_ro3_title: `Identify the physical mechanisms behind AMOC variations`,
    projet_ro3_text: `Using the reanalysis, we aim to isolate the mechanisms responsible for major
          circulation shifts, such as sea-ice retreat, density gradients, or wind patterns. This will
          help us better understand their sensitivity to natural radiative forcing and better anticipate
          its future evolution.`,
    projet_ro3_img_alt: `Humorous illustration of a pensive researcher facing a screen displaying several scientific graphs (temperature anomalies, precipitation, cloud feedback, energy balance) and a list of possible physical mechanisms, symbolising the search for the mechanisms behind climate variations.`,
    projet_ro_ai_credit: `AI-generated illustration (OpenAI)`,

    methodo_data_eyebrow: `The data`,
    methodo_data_title: `Two new syntheses, already published`,
    methodo_data_text: `OCARINA builds on two sea surface temperature (SST) syntheses that I compiled
        during my previous postdoctoral position, covering MIS 9
        (<a href="https://doi.org/10.5194/cp-21-1895-2025" target="_blank" rel="noopener">Stevenard et al., 2025</a>)
        and MIS 7
        (<a href="https://doi.org/10.5194/cp-22-1223-2026" target="_blank" rel="noopener">Legrain et al., 2026</a>).
        The records were harmonised on the precision chronology based on Antarctic ice-core work
        (AICC2023), recalibrated using a Bayesian or Monte Carlo approach specific to each proxy, and
        expressed as temperature anomalies relative to the pre-industrial period (here, 1870–1899 CE).
        δ<sup>13</sup>C data, which document deep-water ventilation, are not yet published but will be
        compiled at the same sites as the SST data, albeit with more limited coverage.`,
    methodo_data_pros_label: `Strengths`,
    methodo_data_pros_1: `Direct measurements ("ground truth")`,
    methodo_data_pros_2: `Reliable reconstructions once recalibrated`,
    methodo_data_pros_3: `Well-quantified uncertainties`,
    methodo_data_cons_label: `Limitations`,
    methodo_data_cons_1: `Uneven and localised geographic coverage`,
    methodo_data_cons_2: `Sometimes limited temporal resolution`,
    methodo_data_cons_3: `Some measurements come from older, heterogeneous laboratory campaigns`,
    methodo_data_map_alt: `Map showing the site locations of the MIS 9 sea surface temperature synthesis, coloured data points over a light continental outline.`,
    methodo_data_caption: `Location of the records in the MIS 9 synthesis. Figure adapted from
          Stevenard et al. (2025), Climate of the Past.`,

    methodo_model_eyebrow: `The model`,
    methodo_model_title: `LOVECLIM: an intermediate-complexity model`,
    methodo_model_text: `OCARINA relies on LOVECLIM, an Earth system Model of Intermediate Complexity
        (EMIC). Its speed (around 250 simulated years per day on a single processor) makes possible
        what no full-complexity model can achieve at this cost: running large ensembles of simulations
        over multi-millennial timescales, while retaining the essential climate feedbacks between
        ocean, atmosphere and sea ice.`,
    methodo_model_pros_label: `Strengths`,
    methodo_model_pros_1: `Fast simulations (~250 simulated years/day)`,
    methodo_model_pros_2: `Enables large ensembles over multi-millennial timescales`,
    methodo_model_pros_3: `Retains essential ocean-atmosphere-ice feedbacks`,
    methodo_model_cons_label: `Limitations`,
    methodo_model_cons_1: `Coarser resolution and physics than a full-complexity model`,
    methodo_model_cons_2: `Some fine-scale processes (eddies, regional scale) are not resolved`,
    methodo_model_cons_3: `Results sometimes differ from reconstructions`,

    methodo_assim_eyebrow: `The assimilation`,
    methodo_assim_title: `The best of both worlds`,
    methodo_assim_text: `A particle filter runs several dozen simulations in parallel, called
        "particles", each representing a possible trajectory of the climate. At regular intervals,
        each particle is compared against the available real-world data (SST, δ<sup>13</sup>C): those
        closest to the data gain weight, while the others are progressively eliminated and replaced.
        Focusing on a single model rather than several makes it easier to produce these large online
        ensembles — an essential requirement for the particle filter. The result: a reconstruction
        with the global coverage and physical consistency of a model, constrained at every step by the
        reality of the reconstructions.`,
    methodo_assim_obs_alt: `Map of sea surface temperature observations available at a given time, scattered measurement points on a transparent background.`,
    methodo_assim_model_alt: `Map of the LOVECLIM model ensemble before assimilation, showing the spread of possible trajectories.`,
    methodo_assim_weighted_alt: `Map of the reweighted simulation ensemble after assimilating observations, with the spread of trajectories narrowed around the real data.`,

    methodo_outro: `Follow the project's progress as it happens on the
      <a href="#actualites">News</a> page!`,

    equipe_encadrement_eyebrow: `Project supervision`,
    equipe_site_link: `Personal website →`,

    equipe_nathan_name: `Nathan Stevenard`,
    equipe_nathan_role: `Project lead — MSCA Postdoctoral Fellow`,
    equipe_nathan_bio: `Nathan Stevenard is a postdoctoral researcher at UCLouvain and leads the
              OCARINA project. A specialist in reconstructing past ocean circulation from sediment
              cores, he has carried out paleoceanography research in France and Belgium, combining
              fieldwork, data compilation and climate modelling.`,
    equipe_nathan_photo_alt: `Portrait of Nathan Stevenard`,

    equipe_hugues_name: `Hugues Goosse`,
    equipe_hugues_role: `Main supervisor — ELIC, UCLouvain`,
    equipe_hugues_bio: `Hugues Goosse is a member of the Earth and Climate (ELIC) team at UCLouvain
              and co-supervises OCARINA. A recognised figure in paleoclimate data assimilation, he
              co-developed the LOVECLIM and NEMO models and has contributed to several working
              groups, including PMIP, PAGES and the IPCC. Author of more than 230 scientific
              articles, he has supervised around fifty master's students and about thirty PhD
              students and postdoctoral researchers.`,
    equipe_hugues_photo_alt: `Portrait of Hugues Goosse`,

    equipe_collab_eyebrow: `External collaborators`,

    equipe_collab1_name: `Qiuzhen Yin`,
    equipe_collab1_affiliation: `UCLouvain, Belgium`,
    equipe_collab1_expertise: `Interglacial modelling and ocean dynamics with LOVECLIM`,

    equipe_collab2_name: `Claire Waelbroeck`,
    equipe_collab2_affiliation: `CNRS, LOCEAN, France`,
    equipe_collab2_expertise: `Ocean dynamics and data assimilation with intermediate-complexity models`,

    equipe_collab3_name: `Emilie Capron`,
    equipe_collab3_affiliation: `CNRS, IGE, France`,
    equipe_collab3_expertise: `Harmonisation of paleoclimate proxies and interglacial reconstructions`,

    equipe_collab4_name: `Laurie Menviel`,
    equipe_collab4_affiliation: `UNSW, Australia`,
    equipe_collab4_expertise: `Ocean circulation, paleoclimate and isotopic modelling`,

    pub_eyebrow: `Publications`,
    pub_title: `Project publications coming soon`,
    pub_text: `The project is starting soon: publications associated with OCARINA will be added
        here as they become available. In the meantime, my previous work is available on
        <a href="https://scholar.google.com/citations?user=fk7YLYIAAAAJ&amp;hl=en&amp;oi=ao" target="_blank" rel="noopener">Google Scholar</a>
        and
        <a href="https://orcid.org/0000-0002-1838-9291" target="_blank" rel="noopener">ORCID</a>.`,

    actu_eyebrow: `News`,
    actu_title: `Project updates`,
    actu_intro_text: `Scientific progress, meetings and public engagement, shared as they happen.`,
    // Kept for re-enabling the empty state between two posts
    // (see the commented-out .news-empty block in index.html).
    actu_empty_text: `Nothing to show yet — the first updates will be published soon.`,

    // News item 1 — First day at ELIC (September 2026)
    actu_post1_date: `September 2026`,
    actu_post1_tag: `Project update`,
    actu_post1_title: `First day at ELIC`,
    actu_post1_text: `1<sup>st</sup> September marks the real start of OCARINA: a nameplate on the door of office B.480,
        and a few busy days of administrative paperwork before diving into the real science. Thanks
        to the European Union and the Marie Skłodowska-Curie Actions (MSCA) programme for the
        opportunity, and to Hugues (and the others) for the warm welcome within the ELIC team.
        More soon!`,
    actu_post1_img_alt: `Office door plate reading "B.480 — Nathan Stevenard, Earth & Climate - ELIC".`,

    footer_brand: `OCARINA`,
    footer_uclouvain_logo_alt: `UCLouvain logo`,
    footer_eli_logo_alt: `Earth and Life Institute logo`,
    footer_address: `Earth and Life Institute — UCLouvain<br>Louvain-la-Neuve, Belgium`,
    footer_contact_label: `Contact`,
    footer_funding_logo_alt: `Logo — Funded by the European Union`,
    footer_funding_text: `Funded by the European Union. Views and opinions expressed are however
        those of the author(s) only and do not necessarily reflect those of the
        European Union or the European Research Executive Agency (REA). Neither
        the European Union nor the granting authority can be held responsible
        for them.`,
    footer_ai_credit: `This site was built with the assistance of Claude (Anthropic).`
  }
};
