// SPDX-License-Identifier: GPL-3.0
/*
    Copyright 2021 0KIMS association.

    This file is generated with [snarkJS](https://github.com/iden3/snarkjs).

    snarkJS is a free software: you can redistribute it and/or modify it
    under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    snarkJS is distributed in the hope that it will be useful, but WITHOUT
    ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
    or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public
    License for more details.

    You should have received a copy of the GNU General Public License
    along with snarkJS. If not, see <https://www.gnu.org/licenses/>.
*/

pragma solidity >=0.7.0 <0.9.0;

contract Groth16Verifier {
    // Scalar field size
    uint256 constant r    = 21888242871839275222246405745257275088548364400416034343698204186575808495617;
    // Base field size
    uint256 constant q   = 21888242871839275222246405745257275088696311157297823662689037894645226208583;

    // Verification Key data
    uint256 constant alphax  = 20491192805390485299153009773594534940189261866228447918068658471970481763042;
    uint256 constant alphay  = 9383485363053290200918347156157836566562967994039712273449902621266178545958;
    uint256 constant betax1  = 4252822878758300859123897981450591353533073413197771768651442665752259397132;
    uint256 constant betax2  = 6375614351688725206403948262868962793625744043794305715222011528459656738731;
    uint256 constant betay1  = 21847035105528745403288232691147584728191162732299865338377159692350059136679;
    uint256 constant betay2  = 10505242626370262277552901082094356697409835680220590971873171140371331206856;
    uint256 constant gammax1 = 11559732032986387107991004021392285783925812861821192530917403151452391805634;
    uint256 constant gammax2 = 10857046999023057135944570762232829481370756359578518086990519993285655852781;
    uint256 constant gammay1 = 4082367875863433681332203403145435568316851327593401208105741076214120093531;
    uint256 constant gammay2 = 8495653923123431417604973247489272438418190587263600148770280649306958101930;
    uint256 constant deltax1 = 1866766967684475077026429609556327106093807957741725946793964808023715990993;
    uint256 constant deltax2 = 4659311190982864441450729518864924847905216029076592248289990634575680082687;
    uint256 constant deltay1 = 21724169671419676774033717936126866779574439945101235323290178202491573424937;
    uint256 constant deltay2 = 18110855247484914672502198436947586961718950553755585790284240244644051838539;

    
    uint256 constant IC0x = 18309573688944280386125138623088688452809083872692035376744546048640448830013;
    uint256 constant IC0y = 8252545664804877655090584019431224476651831706926205661274438486717503078517;
    
    uint256 constant IC1x = 13724968256971608639683042303568749222860593419566750935710775838848837986435;
    uint256 constant IC1y = 15381662839978225352321616022337218020109204566049031666416886460526425965869;
    
    uint256 constant IC2x = 6658337158533056435209096505560783453195590085837382213813946443291522907745;
    uint256 constant IC2y = 9306572662774936565995161999022633816072552576090366864841219594069985311045;
    
    uint256 constant IC3x = 3016212379656281472280944594543865425517575371433088764117523134258049272378;
    uint256 constant IC3y = 2602541768252815682625947578833586588696693258602863952863513327213075022415;
    
    uint256 constant IC4x = 9816742021460791515218039132784611020094104961681834748400830069126900470998;
    uint256 constant IC4y = 10348426808259784844463456918035576955520609745619107315011093049401321052907;
    
    uint256 constant IC5x = 12390552360156525734091763827502679328587811743107273011015150606880160766528;
    uint256 constant IC5y = 183638701568878646260356724728606591551612270852066271019765173548740571911;
    
    uint256 constant IC6x = 18835793819754396966418324264338243421396665011470795519919492253397941511415;
    uint256 constant IC6y = 16276864664271038368712888193551459260270588753753324433645906101416426262868;
    
    uint256 constant IC7x = 17694389750473427714713340305217978269360025960743432126841431716792259216553;
    uint256 constant IC7y = 9650947012756037818471691383867973710225705683344930781931870909910681707965;
    
    uint256 constant IC8x = 681023809986507260745544777274775765194577408747661170783243702960142805219;
    uint256 constant IC8y = 1932661796175590584789349969886643788412159408887985979675775490813383802431;
    
    uint256 constant IC9x = 21017849571203201162910042984857063559850050358879473333160388606658656055561;
    uint256 constant IC9y = 3911553907221003467466493259384657847945603900216601273901250192843649327135;
    
    uint256 constant IC10x = 4697167604081360102767597310388954224248974287943019142969867281938252033279;
    uint256 constant IC10y = 20914530672636702782558652284783707697405729135251189269702367472029790810871;
    
    uint256 constant IC11x = 7369949482368171676645913938455574124222481706187847883741316060813160352388;
    uint256 constant IC11y = 4727140828630085863185239991710228583927761523693680497222423087252568656621;
    
    uint256 constant IC12x = 14064206758912584845837663247671777117618297224535288981280182234011836042358;
    uint256 constant IC12y = 2471602382851033672482675609087779227944480110933367708761146613365806260639;
    
    uint256 constant IC13x = 10736269799746324370561665190090163352937604329850809414102258159966416105084;
    uint256 constant IC13y = 19020761783205714677938272320357485323859845690764961473649357529923739843742;
    
    uint256 constant IC14x = 15341136362541358347806190520786075906481708522139600214759885728822520600097;
    uint256 constant IC14y = 12763186920235818095034854522833621355232606893991661714344676885217537892439;
    
    uint256 constant IC15x = 578923187875322718929551148864821444409122480112505090445143545076478253219;
    uint256 constant IC15y = 7225896456622788032015215894875412641425708855961584676292424041024877345434;
    
    uint256 constant IC16x = 18658344448625472361514517723847121242242621605616951126291199815235032180726;
    uint256 constant IC16y = 809276442226723012951716236123315663471583381870386200917746106613185945511;
    
    uint256 constant IC17x = 5982511498346272830450928090657905047310027938091831616388986968174660586744;
    uint256 constant IC17y = 15509127295444748557090617809365430814867930584899709527225185467490860295086;
    
    uint256 constant IC18x = 15365343054745101753330314041829116085855183564203118460990124415505406826969;
    uint256 constant IC18y = 17550334504170479775394246899009393639023697741142100255396130594222187928235;
    
    uint256 constant IC19x = 7866355633237906295444698578127110324394052841768366342612858876150827405474;
    uint256 constant IC19y = 21464430858041884878748298065323900366619776908859780580478489782011725400869;
    
    uint256 constant IC20x = 11409965274336198784885022968006318806697639878378509836184034039018205539006;
    uint256 constant IC20y = 2443082599914764314285778254288797740317850473858339183835017083972658705816;
    
    uint256 constant IC21x = 20631196981412679591470644564470136894629638047203062147303028037747691665185;
    uint256 constant IC21y = 16030610042702802775194942172772282453105682971282460674664358376585398028650;
    
    uint256 constant IC22x = 5932873505001011489814504863389327841014515111140308423692006170058593510855;
    uint256 constant IC22y = 17566953660226211786235303649779767015859352055560931781743606930162242017339;
    
    uint256 constant IC23x = 3570407908188742187942244566545561532804329313116603204071955254293457835048;
    uint256 constant IC23y = 888957545326078483334559831881533014254240676372674098014547184419455701116;
    
    uint256 constant IC24x = 3277288689053454364185820642980692937625084036430455814141706935377344738916;
    uint256 constant IC24y = 2696579421093670315121077129338319488278396897166913536990931383538616930167;
    
    uint256 constant IC25x = 8817735724143429914354176447563561385550814562843114609784812848112341015983;
    uint256 constant IC25y = 13601212939446098126684839800441456907956559897949946002758742646493707282910;
    
    uint256 constant IC26x = 242520524804255889063254246699618495647968774167019791729252562138656964225;
    uint256 constant IC26y = 16973052504220229148399058252278309977055266771019496607437733674562578695485;
    
    uint256 constant IC27x = 9013440492883720882679839217393830253117904651891690131192913212688263035425;
    uint256 constant IC27y = 2315255966339599410626919212510568554886702627946488701592576459930568620330;
    
    uint256 constant IC28x = 20679024761061200931816572597032340280314547584004877718544566240873670628592;
    uint256 constant IC28y = 18414855204652616530204390391588003816097467665749731519336041029937302999453;
    
    uint256 constant IC29x = 15072238453926190207791223017865893501821923615348984249884825516230481256082;
    uint256 constant IC29y = 8895769322320811707816032509589818173329092645233968889885933660205774178706;
    
    uint256 constant IC30x = 8094336611135960044601785233929226833486685560260660169986135663954428520824;
    uint256 constant IC30y = 8369015164321101629728699871242940331641480615160209965994546508586139206741;
    
    uint256 constant IC31x = 7731401541551544766699504483993337254794583686019158504985376407109162651461;
    uint256 constant IC31y = 6875232187288241504932091965559094778639331441478864488775043444383484728099;
    
    uint256 constant IC32x = 15499568761668065997918859624568562489526362773924227148983177629553450965712;
    uint256 constant IC32y = 37183277849483539583991543127527538945636653775623877772561407984346105078;
    
    uint256 constant IC33x = 4830297224837660087468639850081711742034935708467584422471158078126920708577;
    uint256 constant IC33y = 3176598632718619413479684717877505425106590182052247940017298335183173430555;
    
    uint256 constant IC34x = 10903574547819748549732540241229407360774915035217537369261916171194637443689;
    uint256 constant IC34y = 8858084338009697021205337490679360111246956214665724578280033119614287642646;
    
    uint256 constant IC35x = 15154785802553093403431522473988497260639725114747604440906057109686573477260;
    uint256 constant IC35y = 17795783893908215353511907097930773017805088530085337443958991067967762102655;
    
    uint256 constant IC36x = 2877376750994603714365289452890690316758364618871559804575161188222888112659;
    uint256 constant IC36y = 21735034166232609946148691607738854948236880094749663970921800614808406570078;
    
    uint256 constant IC37x = 3106333406220985162662100498986097229503869771836880247449360175981334157219;
    uint256 constant IC37y = 17865223479402419176248696836928756900496547663372228667207093311437768295043;
    
    uint256 constant IC38x = 697616770606607558981076211967433584976298008163992912003754086388870284439;
    uint256 constant IC38y = 11906015812090725752663954648490567553779437355520102774022319868767187695689;
    
    uint256 constant IC39x = 3066310853266947605681856994423652372406552925855313167141079102185871744170;
    uint256 constant IC39y = 7626480973749375313659327633446078949888566319591497861831619014932519116751;
    
    uint256 constant IC40x = 15547701183470494067964667727872231581260922370486244851758214336411550884118;
    uint256 constant IC40y = 17254233622002752357409825536770526543691283207810763163037848030419243484107;
    
    uint256 constant IC41x = 148292111307819306551390818446543424926350137834811534314052769163101561615;
    uint256 constant IC41y = 5500278154531033306799803347968647249419995483363964893976872863860493675643;
    
    uint256 constant IC42x = 12743968346040894236883464766141708515376809290327284933867605208542292732858;
    uint256 constant IC42y = 8018727597120067346853370292627401274187160859591238514067106241642604330800;
    
    uint256 constant IC43x = 691582148862529301778359900102607488395950567870758626909238499283070907403;
    uint256 constant IC43y = 8322981267261297384216741120713931240448479642727454047966782335276500598941;
    
    uint256 constant IC44x = 9278556347697362408180475360650302879696956102573343825404708863886542469887;
    uint256 constant IC44y = 9707313610712975990137006496452650791189150375669922886361334038088982701633;
    
    uint256 constant IC45x = 16829628853824851952140218215780485977108634939746967111056084269789078029054;
    uint256 constant IC45y = 4014469364669616007649171544577204356746921930709274053313209030043418033476;
    
    uint256 constant IC46x = 6641507292884053256398842662760831671384924006947363057533254043701551586373;
    uint256 constant IC46y = 7538020194481282455458251442306108143426114350545149178408028117651220441472;
    
    uint256 constant IC47x = 12391637512080499257662827283609890066662280564827165438208548685097578037073;
    uint256 constant IC47y = 19437801841177143231245408244309863501557488312715256561188881154500655967430;
    
    uint256 constant IC48x = 2890419354616910106196901223286921838329798511800552609084640710443390163241;
    uint256 constant IC48y = 17975752498184815248395543766804130572102816400153672759006930380470336365869;
    
    uint256 constant IC49x = 6356005874902387613526417303680497717538411035346314609640597118219882038318;
    uint256 constant IC49y = 8302058795733576312472765323167781290091115643523515316545093550229011458540;
    
    uint256 constant IC50x = 11467131470051250993846835458840241675362424681819054061438248446919198169881;
    uint256 constant IC50y = 3871876403715839319031033065719065817272850181251392446785808539701071977102;
    
    uint256 constant IC51x = 15418086696872287571839851755232562114887233182615521852215658895185306876954;
    uint256 constant IC51y = 15382077575814602641342651729699573330025044617981182458503295491525153173084;
    
    uint256 constant IC52x = 3518987841129817544165039005314383353101340037797957633052466976442785122773;
    uint256 constant IC52y = 13837229004430570059744211328338876274484428344134154507669720190847659718233;
    
    uint256 constant IC53x = 7836949953256230571863851319029582093455769148252637278978059072186916563644;
    uint256 constant IC53y = 16016031450925672052785771223602323332437162896094661214304742145432039577613;
    
    uint256 constant IC54x = 20068450523518386339209415533919057643114001865737097665607475828358564264945;
    uint256 constant IC54y = 16421501709602348379027099074800499750625346088991760891399592152922510486159;
    
    uint256 constant IC55x = 6956561678992452882033176540383047718724367746360885744508319174475838500863;
    uint256 constant IC55y = 852570432177137889322374252700826029568865060946246166272021327148649269580;
    
    uint256 constant IC56x = 19239577481052852428204088163978921314665017300758086261251463662450612991642;
    uint256 constant IC56y = 3132276701298581485739714988349614613303009325166772769288844918814734649647;
    
 
    // Memory data
    uint16 constant pVk = 0;
    uint16 constant pPairing = 128;

    uint16 constant pLastMem = 896;

    function verifyProof(uint[2] calldata _pA, uint[2][2] calldata _pB, uint[2] calldata _pC, uint[56] calldata _pubSignals) public view returns (bool) {
        assembly {
            function checkField(v) {
                if iszero(lt(v, r)) {
                    mstore(0, 0)
                    return(0, 0x20)
                }
            }
            
            // G1 function to multiply a G1 value(x,y) to value in an address
            function g1_mulAccC(pR, x, y, s) {
                let success
                let mIn := mload(0x40)
                mstore(mIn, x)
                mstore(add(mIn, 32), y)
                mstore(add(mIn, 64), s)

                success := staticcall(sub(gas(), 2000), 7, mIn, 96, mIn, 64)

                if iszero(success) {
                    mstore(0, 0)
                    return(0, 0x20)
                }

                mstore(add(mIn, 64), mload(pR))
                mstore(add(mIn, 96), mload(add(pR, 32)))

                success := staticcall(sub(gas(), 2000), 6, mIn, 128, pR, 64)

                if iszero(success) {
                    mstore(0, 0)
                    return(0, 0x20)
                }
            }

            function checkPairing(pA, pB, pC, pubSignals, pMem) -> isOk {
                let _pPairing := add(pMem, pPairing)
                let _pVk := add(pMem, pVk)

                mstore(_pVk, IC0x)
                mstore(add(_pVk, 32), IC0y)

                // Compute the linear combination vk_x
                
                g1_mulAccC(_pVk, IC1x, IC1y, calldataload(add(pubSignals, 0)))
                
                g1_mulAccC(_pVk, IC2x, IC2y, calldataload(add(pubSignals, 32)))
                
                g1_mulAccC(_pVk, IC3x, IC3y, calldataload(add(pubSignals, 64)))
                
                g1_mulAccC(_pVk, IC4x, IC4y, calldataload(add(pubSignals, 96)))
                
                g1_mulAccC(_pVk, IC5x, IC5y, calldataload(add(pubSignals, 128)))
                
                g1_mulAccC(_pVk, IC6x, IC6y, calldataload(add(pubSignals, 160)))
                
                g1_mulAccC(_pVk, IC7x, IC7y, calldataload(add(pubSignals, 192)))
                
                g1_mulAccC(_pVk, IC8x, IC8y, calldataload(add(pubSignals, 224)))
                
                g1_mulAccC(_pVk, IC9x, IC9y, calldataload(add(pubSignals, 256)))
                
                g1_mulAccC(_pVk, IC10x, IC10y, calldataload(add(pubSignals, 288)))
                
                g1_mulAccC(_pVk, IC11x, IC11y, calldataload(add(pubSignals, 320)))
                
                g1_mulAccC(_pVk, IC12x, IC12y, calldataload(add(pubSignals, 352)))
                
                g1_mulAccC(_pVk, IC13x, IC13y, calldataload(add(pubSignals, 384)))
                
                g1_mulAccC(_pVk, IC14x, IC14y, calldataload(add(pubSignals, 416)))
                
                g1_mulAccC(_pVk, IC15x, IC15y, calldataload(add(pubSignals, 448)))
                
                g1_mulAccC(_pVk, IC16x, IC16y, calldataload(add(pubSignals, 480)))
                
                g1_mulAccC(_pVk, IC17x, IC17y, calldataload(add(pubSignals, 512)))
                
                g1_mulAccC(_pVk, IC18x, IC18y, calldataload(add(pubSignals, 544)))
                
                g1_mulAccC(_pVk, IC19x, IC19y, calldataload(add(pubSignals, 576)))
                
                g1_mulAccC(_pVk, IC20x, IC20y, calldataload(add(pubSignals, 608)))
                
                g1_mulAccC(_pVk, IC21x, IC21y, calldataload(add(pubSignals, 640)))
                
                g1_mulAccC(_pVk, IC22x, IC22y, calldataload(add(pubSignals, 672)))
                
                g1_mulAccC(_pVk, IC23x, IC23y, calldataload(add(pubSignals, 704)))
                
                g1_mulAccC(_pVk, IC24x, IC24y, calldataload(add(pubSignals, 736)))
                
                g1_mulAccC(_pVk, IC25x, IC25y, calldataload(add(pubSignals, 768)))
                
                g1_mulAccC(_pVk, IC26x, IC26y, calldataload(add(pubSignals, 800)))
                
                g1_mulAccC(_pVk, IC27x, IC27y, calldataload(add(pubSignals, 832)))
                
                g1_mulAccC(_pVk, IC28x, IC28y, calldataload(add(pubSignals, 864)))
                
                g1_mulAccC(_pVk, IC29x, IC29y, calldataload(add(pubSignals, 896)))
                
                g1_mulAccC(_pVk, IC30x, IC30y, calldataload(add(pubSignals, 928)))
                
                g1_mulAccC(_pVk, IC31x, IC31y, calldataload(add(pubSignals, 960)))
                
                g1_mulAccC(_pVk, IC32x, IC32y, calldataload(add(pubSignals, 992)))
                
                g1_mulAccC(_pVk, IC33x, IC33y, calldataload(add(pubSignals, 1024)))
                
                g1_mulAccC(_pVk, IC34x, IC34y, calldataload(add(pubSignals, 1056)))
                
                g1_mulAccC(_pVk, IC35x, IC35y, calldataload(add(pubSignals, 1088)))
                
                g1_mulAccC(_pVk, IC36x, IC36y, calldataload(add(pubSignals, 1120)))
                
                g1_mulAccC(_pVk, IC37x, IC37y, calldataload(add(pubSignals, 1152)))
                
                g1_mulAccC(_pVk, IC38x, IC38y, calldataload(add(pubSignals, 1184)))
                
                g1_mulAccC(_pVk, IC39x, IC39y, calldataload(add(pubSignals, 1216)))
                
                g1_mulAccC(_pVk, IC40x, IC40y, calldataload(add(pubSignals, 1248)))
                
                g1_mulAccC(_pVk, IC41x, IC41y, calldataload(add(pubSignals, 1280)))
                
                g1_mulAccC(_pVk, IC42x, IC42y, calldataload(add(pubSignals, 1312)))
                
                g1_mulAccC(_pVk, IC43x, IC43y, calldataload(add(pubSignals, 1344)))
                
                g1_mulAccC(_pVk, IC44x, IC44y, calldataload(add(pubSignals, 1376)))
                
                g1_mulAccC(_pVk, IC45x, IC45y, calldataload(add(pubSignals, 1408)))
                
                g1_mulAccC(_pVk, IC46x, IC46y, calldataload(add(pubSignals, 1440)))
                
                g1_mulAccC(_pVk, IC47x, IC47y, calldataload(add(pubSignals, 1472)))
                
                g1_mulAccC(_pVk, IC48x, IC48y, calldataload(add(pubSignals, 1504)))
                
                g1_mulAccC(_pVk, IC49x, IC49y, calldataload(add(pubSignals, 1536)))
                
                g1_mulAccC(_pVk, IC50x, IC50y, calldataload(add(pubSignals, 1568)))
                
                g1_mulAccC(_pVk, IC51x, IC51y, calldataload(add(pubSignals, 1600)))
                
                g1_mulAccC(_pVk, IC52x, IC52y, calldataload(add(pubSignals, 1632)))
                
                g1_mulAccC(_pVk, IC53x, IC53y, calldataload(add(pubSignals, 1664)))
                
                g1_mulAccC(_pVk, IC54x, IC54y, calldataload(add(pubSignals, 1696)))
                
                g1_mulAccC(_pVk, IC55x, IC55y, calldataload(add(pubSignals, 1728)))
                
                g1_mulAccC(_pVk, IC56x, IC56y, calldataload(add(pubSignals, 1760)))
                

                // -A
                mstore(_pPairing, calldataload(pA))
                mstore(add(_pPairing, 32), mod(sub(q, calldataload(add(pA, 32))), q))

                // B
                mstore(add(_pPairing, 64), calldataload(pB))
                mstore(add(_pPairing, 96), calldataload(add(pB, 32)))
                mstore(add(_pPairing, 128), calldataload(add(pB, 64)))
                mstore(add(_pPairing, 160), calldataload(add(pB, 96)))

                // alpha1
                mstore(add(_pPairing, 192), alphax)
                mstore(add(_pPairing, 224), alphay)

                // beta2
                mstore(add(_pPairing, 256), betax1)
                mstore(add(_pPairing, 288), betax2)
                mstore(add(_pPairing, 320), betay1)
                mstore(add(_pPairing, 352), betay2)

                // vk_x
                mstore(add(_pPairing, 384), mload(add(pMem, pVk)))
                mstore(add(_pPairing, 416), mload(add(pMem, add(pVk, 32))))


                // gamma2
                mstore(add(_pPairing, 448), gammax1)
                mstore(add(_pPairing, 480), gammax2)
                mstore(add(_pPairing, 512), gammay1)
                mstore(add(_pPairing, 544), gammay2)

                // C
                mstore(add(_pPairing, 576), calldataload(pC))
                mstore(add(_pPairing, 608), calldataload(add(pC, 32)))

                // delta2
                mstore(add(_pPairing, 640), deltax1)
                mstore(add(_pPairing, 672), deltax2)
                mstore(add(_pPairing, 704), deltay1)
                mstore(add(_pPairing, 736), deltay2)


                let success := staticcall(sub(gas(), 2000), 8, _pPairing, 768, _pPairing, 0x20)

                isOk := and(success, mload(_pPairing))
            }

            let pMem := mload(0x40)
            mstore(0x40, add(pMem, pLastMem))

            // Validate that all evaluations ∈ F
            
            checkField(calldataload(add(_pubSignals, 0)))
            
            checkField(calldataload(add(_pubSignals, 32)))
            
            checkField(calldataload(add(_pubSignals, 64)))
            
            checkField(calldataload(add(_pubSignals, 96)))
            
            checkField(calldataload(add(_pubSignals, 128)))
            
            checkField(calldataload(add(_pubSignals, 160)))
            
            checkField(calldataload(add(_pubSignals, 192)))
            
            checkField(calldataload(add(_pubSignals, 224)))
            
            checkField(calldataload(add(_pubSignals, 256)))
            
            checkField(calldataload(add(_pubSignals, 288)))
            
            checkField(calldataload(add(_pubSignals, 320)))
            
            checkField(calldataload(add(_pubSignals, 352)))
            
            checkField(calldataload(add(_pubSignals, 384)))
            
            checkField(calldataload(add(_pubSignals, 416)))
            
            checkField(calldataload(add(_pubSignals, 448)))
            
            checkField(calldataload(add(_pubSignals, 480)))
            
            checkField(calldataload(add(_pubSignals, 512)))
            
            checkField(calldataload(add(_pubSignals, 544)))
            
            checkField(calldataload(add(_pubSignals, 576)))
            
            checkField(calldataload(add(_pubSignals, 608)))
            
            checkField(calldataload(add(_pubSignals, 640)))
            
            checkField(calldataload(add(_pubSignals, 672)))
            
            checkField(calldataload(add(_pubSignals, 704)))
            
            checkField(calldataload(add(_pubSignals, 736)))
            
            checkField(calldataload(add(_pubSignals, 768)))
            
            checkField(calldataload(add(_pubSignals, 800)))
            
            checkField(calldataload(add(_pubSignals, 832)))
            
            checkField(calldataload(add(_pubSignals, 864)))
            
            checkField(calldataload(add(_pubSignals, 896)))
            
            checkField(calldataload(add(_pubSignals, 928)))
            
            checkField(calldataload(add(_pubSignals, 960)))
            
            checkField(calldataload(add(_pubSignals, 992)))
            
            checkField(calldataload(add(_pubSignals, 1024)))
            
            checkField(calldataload(add(_pubSignals, 1056)))
            
            checkField(calldataload(add(_pubSignals, 1088)))
            
            checkField(calldataload(add(_pubSignals, 1120)))
            
            checkField(calldataload(add(_pubSignals, 1152)))
            
            checkField(calldataload(add(_pubSignals, 1184)))
            
            checkField(calldataload(add(_pubSignals, 1216)))
            
            checkField(calldataload(add(_pubSignals, 1248)))
            
            checkField(calldataload(add(_pubSignals, 1280)))
            
            checkField(calldataload(add(_pubSignals, 1312)))
            
            checkField(calldataload(add(_pubSignals, 1344)))
            
            checkField(calldataload(add(_pubSignals, 1376)))
            
            checkField(calldataload(add(_pubSignals, 1408)))
            
            checkField(calldataload(add(_pubSignals, 1440)))
            
            checkField(calldataload(add(_pubSignals, 1472)))
            
            checkField(calldataload(add(_pubSignals, 1504)))
            
            checkField(calldataload(add(_pubSignals, 1536)))
            
            checkField(calldataload(add(_pubSignals, 1568)))
            
            checkField(calldataload(add(_pubSignals, 1600)))
            
            checkField(calldataload(add(_pubSignals, 1632)))
            
            checkField(calldataload(add(_pubSignals, 1664)))
            
            checkField(calldataload(add(_pubSignals, 1696)))
            
            checkField(calldataload(add(_pubSignals, 1728)))
            
            checkField(calldataload(add(_pubSignals, 1760)))
            
            checkField(calldataload(add(_pubSignals, 1792)))
            

            // Validate all evaluations
            let isValid := checkPairing(_pA, _pB, _pC, _pubSignals, pMem)

            mstore(0, isValid)
             return(0, 0x20)
         }
     }
 }
