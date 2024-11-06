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
	uint256 constant r =
		21888242871839275222246405745257275088548364400416034343698204186575808495617;
	// Base field size
	uint256 constant q =
		21888242871839275222246405745257275088696311157297823662689037894645226208583;

	// Verification Key data
	uint256 constant alphax =
		20491192805390485299153009773594534940189261866228447918068658471970481763042;
	uint256 constant alphay =
		9383485363053290200918347156157836566562967994039712273449902621266178545958;
	uint256 constant betax1 =
		4252822878758300859123897981450591353533073413197771768651442665752259397132;
	uint256 constant betax2 =
		6375614351688725206403948262868962793625744043794305715222011528459656738731;
	uint256 constant betay1 =
		21847035105528745403288232691147584728191162732299865338377159692350059136679;
	uint256 constant betay2 =
		10505242626370262277552901082094356697409835680220590971873171140371331206856;
	uint256 constant gammax1 =
		11559732032986387107991004021392285783925812861821192530917403151452391805634;
	uint256 constant gammax2 =
		10857046999023057135944570762232829481370756359578518086990519993285655852781;
	uint256 constant gammay1 =
		4082367875863433681332203403145435568316851327593401208105741076214120093531;
	uint256 constant gammay2 =
		8495653923123431417604973247489272438418190587263600148770280649306958101930;
	uint256 constant deltax1 =
		20520124732927332327873265850761449286007985884576783646471472851495393940176;
	uint256 constant deltax2 =
		15186265480905208282922239900328489292444307478543511518778432579560350684744;
	uint256 constant deltay1 =
		16439709157989854781575386903705114956127999812986029888560530272710365313983;
	uint256 constant deltay2 =
		4214104585402129979383307131221473200132164352817422962054819905839268800475;

	uint256 constant IC0x =
		12277324663121539084679683501505688594366597380533437740994022534746968296925;
	uint256 constant IC0y =
		16380671995001451342386700719067227883287820400238358061288182230554025598302;

	uint256 constant IC1x =
		5190353014499945678829068468990765742757549186510864889270232008806153087396;
	uint256 constant IC1y =
		19834252880244132418620519034879785076508390279933685386298170186441409909168;

	uint256 constant IC2x =
		2744387324177524065055432568462502060905874970452855629215133135989691358725;
	uint256 constant IC2y =
		19683497734329386289581254469251156544945887989872142897805445597996697171563;

	uint256 constant IC3x =
		16364581735408788196876671261794253330229515801819949732471870260428856164875;
	uint256 constant IC3y =
		5360020983625766116016458053299551190916514189424402143747655065316573073737;

	uint256 constant IC4x =
		12105401442777576022568243830504304724319835802489753305392640672905314429318;
	uint256 constant IC4y =
		4533767381643525748539209433291972728869771390681883411971339130788167678191;

	uint256 constant IC5x =
		14655105260061026013536435219722244582641001994548095039207403606952986548676;
	uint256 constant IC5y =
		6164561044598494876893634560104394990241471992383826621011589810538448632553;

	uint256 constant IC6x =
		11422538929165273292646471640436931586150243226165158258377759121207698546693;
	uint256 constant IC6y =
		19996118372594129253740080624681752122794924310923896590723668163609020119303;

	uint256 constant IC7x =
		1608169220478017683201283029407537404003465420344898051589898653740906874189;
	uint256 constant IC7y =
		4598219219881469847753617821782195429646988589418969082785191839339407067731;

	uint256 constant IC8x =
		15827337144240104434284958539474213118722302813402254231816052334889847603700;
	uint256 constant IC8y =
		4524272288678524202977212434542413854721939205352325806226415649043493656587;

	uint256 constant IC9x =
		12903302956025509577349732724608972753848852747646591736799284416811318356691;
	uint256 constant IC9y =
		1032653756669871628418431952179410642769924541469386596753111579808738155791;

	uint256 constant IC10x =
		5058294297628429474257831813564601282656608632738746636364633118084915796686;
	uint256 constant IC10y =
		9916588999043034758140198050858798913696272314277526355595377569882762118395;

	uint256 constant IC11x =
		5520950258000124528649959009587322206194309520867900771157489126718260495588;
	uint256 constant IC11y =
		13423687093301599638921916315302488464894457098480820589963235628977328873959;

	uint256 constant IC12x =
		17372417161020358511851158950579180064435550406197880511786173528653080571324;
	uint256 constant IC12y =
		16388281283477736785676413647165899714739561439383723924878531463253258535798;

	uint256 constant IC13x =
		11615484768784941273831902304054470951878190970768148868549524618072759518177;
	uint256 constant IC13y =
		2454462683711297495640450591326260718272062089549919947762999731787907307322;

	uint256 constant IC14x =
		20998123019599417074129870225407389744016263905569276719056003230750882078966;
	uint256 constant IC14y =
		2027449160682157357573641319743953001139995224502434755334363787127125692307;

	uint256 constant IC15x =
		20975620125341868607446197473110148889440951779129665826706258866979403571951;
	uint256 constant IC15y =
		9036700354882894745639015859925148940502671522437251966395307498062201300115;

	uint256 constant IC16x =
		8587069003289925272802713047590422438240603180529506394622515428975339586412;
	uint256 constant IC16y =
		4378223105097068792530355962047054913632602659154515398746431479792494683307;

	uint256 constant IC17x =
		10425351374487491092078025911162404974424865904747299578229309190820507362670;
	uint256 constant IC17y =
		7938118020641905969824944125336180473504483041687733798598901735869758550276;

	uint256 constant IC18x =
		2731447294069503101366715738330788892158751204559397907475007657161030049358;
	uint256 constant IC18y =
		4414384646459616947533237428069749099795594730622459314735543270574401384454;

	uint256 constant IC19x =
		12181507654019731410038372938606308249489708161279257326624219579898870156212;
	uint256 constant IC19y =
		18689993809764382264456275934137957896993901004031326057532324815067748979258;

	uint256 constant IC20x =
		3428093310012627190830381109488448213941407467199041818748319516567565675097;
	uint256 constant IC20y =
		9212363656631904394679539472256675043097198441642452923275866620632093584464;

	uint256 constant IC21x =
		18167927253289725405435989072528319789610028309675996687776482217930219097324;
	uint256 constant IC21y =
		11536766067781669236882843903281104178384579779772177559138730708427497071957;

	uint256 constant IC22x =
		20035810338607314323955949585659972285441022575981103656094294313909996656932;
	uint256 constant IC22y =
		7997562424985358365305111098343437150762605947716803920426785164718797831565;

	uint256 constant IC23x =
		9986712342698702618149186010348406416155846897870904219632010665312730756761;
	uint256 constant IC23y =
		20963946329982329161430750799528828110178648939369147690623681890735508473084;

	uint256 constant IC24x =
		16940190367628636615510438529595839357899514570779911633108631150606017639658;
	uint256 constant IC24y =
		19811948534754191487432847089954280623902539989834110172452145788629097124701;

	uint256 constant IC25x =
		1249106085684745092237253910125724951748735669738602119191760896489914096;
	uint256 constant IC25y =
		18177408893599232440719388554509588727793527447172049482533937110555460990841;

	uint256 constant IC26x =
		10365857423353553736405489148874295650826880157768887040509353531314321583383;
	uint256 constant IC26y =
		20770042327207453865166626940058297688611226609377585542598350001082817948397;

	uint256 constant IC27x =
		5736063059699666199362675961074050835883052364097807660115972868365507559013;
	uint256 constant IC27y =
		13643543907639316479329632939940554017983537889535117817821274723297156403963;

	uint256 constant IC28x =
		16025180862200276449259543624981925606735997363919624909545708294152472351636;
	uint256 constant IC28y =
		1109552921991830101042328748080272391176315562285922063015521733351877181121;

	uint256 constant IC29x =
		17682240688395550617822273512749416227712105463719965283711530657071591873729;
	uint256 constant IC29y =
		6868330462624654892085690822602481554757264196866113028269031649330358928973;

	uint256 constant IC30x =
		10379314116528041264715120180753972214746348102205434178712478459211919727266;
	uint256 constant IC30y =
		2868544592992480669628601978351264912651542308675709135346303285296832312831;

	uint256 constant IC31x =
		18301755856663451898705671831143264776087370227626870537209885753154727745135;
	uint256 constant IC31y =
		14989566943693248337375345382490657233151030488271584236577019477988984570667;

	uint256 constant IC32x =
		2611427460304728674512368081743588702374291565032144045509755125494172829431;
	uint256 constant IC32y =
		20284861001848591395643574545845384817851721085403656397055760971158683669531;

	uint256 constant IC33x =
		9994381801955638660870716129575806119951239073244977744968125742612770701964;
	uint256 constant IC33y =
		6134966411093459650168989683578162450448205314735925390105026767537838520837;

	uint256 constant IC34x =
		10989902820069540724912125933733153146671332874535466610661438364982363208949;
	uint256 constant IC34y =
		5229068301666861962954921868276695072426995494059989772856487541222100352029;

	uint256 constant IC35x =
		2212722254371299303793343402488309920014272130931170869023535773818640929570;
	uint256 constant IC35y =
		1060329465445567102816559472001034126110140906554484765351978517718148355198;

	uint256 constant IC36x =
		12077706967014624229026277618706342799606244159314183725710551090492280924333;
	uint256 constant IC36y =
		13913176388623636150479995111956344908631089983957536990999858794721298540066;

	uint256 constant IC37x =
		21703189902951736445560257737292703316136812014860113440756072187434728214251;
	uint256 constant IC37y =
		20216804026149183772301756194798673978326145478066942964148185194471427049500;

	uint256 constant IC38x =
		10287783606385313753228693957804848457286636182654320335342518112953843818919;
	uint256 constant IC38y =
		7911687969516121229905845724698683542246332278360312768599636015608269134617;

	uint256 constant IC39x =
		13969567783361525977319027962746248904987928696546960453829160539195495904734;
	uint256 constant IC39y =
		8226774691959374867876706802590453926240599737820644781139469760858901082046;

	uint256 constant IC40x =
		12697191759416239548120236436310291446114849792335587786166698427319674203204;
	uint256 constant IC40y =
		3576868414216527077611133030448465832146556559505043339767774185581059468387;

	uint256 constant IC41x =
		3652859335159578832495246405427801782343652027755250621884208881733454256186;
	uint256 constant IC41y =
		16152959212357630758336210305169567061764323654844642188021525025790159170529;

	uint256 constant IC42x =
		11820498121947253273708623566630026730670651510095012853447505632961521054725;
	uint256 constant IC42y =
		8425173595940729385440183444082426527082856656139671103060591152329269303855;

	uint256 constant IC43x =
		15208297703573936040995781936495139337521314609783232818533645617542642581767;
	uint256 constant IC43y =
		6603929002478023568238603869607485302965102643822082232775178803796403753253;

	uint256 constant IC44x =
		16869513925253089884764564886765646809847932834576677567710730324239424030361;
	uint256 constant IC44y =
		21221128175458514836954538107809973142440946772066955944605015744978703367122;

	uint256 constant IC45x =
		3664632576269586275268899307631410895325605682335945634029613546053691328156;
	uint256 constant IC45y =
		7474344736288316274843922281593099876544805654985985724747960087492926404850;

	uint256 constant IC46x =
		3773138018575580585374024433281480935981191438163984766886397827178228039569;
	uint256 constant IC46y =
		19811742704341863535165372982863825336866524862873986593851936669353129254680;

	uint256 constant IC47x =
		4580674780054124441594349666004146388709131468839778278701144566831443831794;
	uint256 constant IC47y =
		4384676859140385495483611633082439929576746843130514907256296890842423834381;

	uint256 constant IC48x =
		12387974119877388993893752215223895830576785638229571939661240963371031359402;
	uint256 constant IC48y =
		21311945906798935664679025953811701388699515681513409771402947009784886654209;

	uint256 constant IC49x =
		11211632267490412783876750476130613984493796022328990209630372870314956479826;
	uint256 constant IC49y =
		14531740894319885133470510720446922636333004070495706081492802440018383390840;

	uint256 constant IC50x =
		6714987073820449065380642291390555300685043249048204084269770268747301787779;
	uint256 constant IC50y =
		7763561248050280096095159154676766138428320406645755768068361957974882067115;

	uint256 constant IC51x =
		13056055619098914681540454317027488143392462374786003307011705246757544831587;
	uint256 constant IC51y =
		18313444934933122830501365064560434636312273939991982798333175598744399972595;

	uint256 constant IC52x =
		4344951956234079360961640662614567004666787873907691179692172694665726642169;
	uint256 constant IC52y =
		14507578567524397582957955462192850056536719401985418484169419801944018852343;

	uint256 constant IC53x =
		855550140188142399858117164334358804746643689273435028084474760058483461635;
	uint256 constant IC53y =
		1662209466478449172786812143176226372399042447403840480013431593274668031013;

	uint256 constant IC54x =
		5613283962972129075833205387311501596500496040148780687862709110664762261740;
	uint256 constant IC54y =
		15966836247521330481117830446609287521890060697578471208739251082743743838618;

	uint256 constant IC55x =
		4636150489632987218929183587987436844787933308941066908836421800220544340096;
	uint256 constant IC55y =
		10594320900232129426302566663957916877583440535053085183082339191464034594716;

	uint256 constant IC56x =
		8474281620870935707379122936790909527334611946198442568724838947244059965057;
	uint256 constant IC56y =
		2419538145415989208380804987763450818207947625964229197081105281020432534379;

	uint256 constant IC57x =
		11133736744489853771290190634021140521893271092184861404391472237936013099678;
	uint256 constant IC57y =
		7516679398736825245452800590216203276994861843912925631440499505593407281942;

	uint256 constant IC58x =
		1191157660205228693453984218558421426825701517352034600442070625748571980591;
	uint256 constant IC58y =
		20712098598797183834002713723567990918966066051166975287543977089153806042084;

	uint256 constant IC59x =
		19882465696230520674715442384672558779086822281593399553240353388492021496542;
	uint256 constant IC59y =
		991900654516700352789785899520776173696339481656855012321394622129641703221;

	uint256 constant IC60x =
		7086475804411478827870597169229868726186285910024168908879665198904955302786;
	uint256 constant IC60y =
		2691192618814776029125685779609142812764332191269301113887218595274094044958;

	// Memory data
	uint16 constant pVk = 0;
	uint16 constant pPairing = 128;

	uint16 constant pLastMem = 896;

	function verifyProof(
		uint[2] calldata _pA,
		uint[2][2] calldata _pB,
		uint[2] calldata _pC,
		uint[60] calldata _pubSignals
	) public view returns (bool) {
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

				g1_mulAccC(
					_pVk,
					IC10x,
					IC10y,
					calldataload(add(pubSignals, 288))
				)

				g1_mulAccC(
					_pVk,
					IC11x,
					IC11y,
					calldataload(add(pubSignals, 320))
				)

				g1_mulAccC(
					_pVk,
					IC12x,
					IC12y,
					calldataload(add(pubSignals, 352))
				)

				g1_mulAccC(
					_pVk,
					IC13x,
					IC13y,
					calldataload(add(pubSignals, 384))
				)

				g1_mulAccC(
					_pVk,
					IC14x,
					IC14y,
					calldataload(add(pubSignals, 416))
				)

				g1_mulAccC(
					_pVk,
					IC15x,
					IC15y,
					calldataload(add(pubSignals, 448))
				)

				g1_mulAccC(
					_pVk,
					IC16x,
					IC16y,
					calldataload(add(pubSignals, 480))
				)

				g1_mulAccC(
					_pVk,
					IC17x,
					IC17y,
					calldataload(add(pubSignals, 512))
				)

				g1_mulAccC(
					_pVk,
					IC18x,
					IC18y,
					calldataload(add(pubSignals, 544))
				)

				g1_mulAccC(
					_pVk,
					IC19x,
					IC19y,
					calldataload(add(pubSignals, 576))
				)

				g1_mulAccC(
					_pVk,
					IC20x,
					IC20y,
					calldataload(add(pubSignals, 608))
				)

				g1_mulAccC(
					_pVk,
					IC21x,
					IC21y,
					calldataload(add(pubSignals, 640))
				)

				g1_mulAccC(
					_pVk,
					IC22x,
					IC22y,
					calldataload(add(pubSignals, 672))
				)

				g1_mulAccC(
					_pVk,
					IC23x,
					IC23y,
					calldataload(add(pubSignals, 704))
				)

				g1_mulAccC(
					_pVk,
					IC24x,
					IC24y,
					calldataload(add(pubSignals, 736))
				)

				g1_mulAccC(
					_pVk,
					IC25x,
					IC25y,
					calldataload(add(pubSignals, 768))
				)

				g1_mulAccC(
					_pVk,
					IC26x,
					IC26y,
					calldataload(add(pubSignals, 800))
				)

				g1_mulAccC(
					_pVk,
					IC27x,
					IC27y,
					calldataload(add(pubSignals, 832))
				)

				g1_mulAccC(
					_pVk,
					IC28x,
					IC28y,
					calldataload(add(pubSignals, 864))
				)

				g1_mulAccC(
					_pVk,
					IC29x,
					IC29y,
					calldataload(add(pubSignals, 896))
				)

				g1_mulAccC(
					_pVk,
					IC30x,
					IC30y,
					calldataload(add(pubSignals, 928))
				)

				g1_mulAccC(
					_pVk,
					IC31x,
					IC31y,
					calldataload(add(pubSignals, 960))
				)

				g1_mulAccC(
					_pVk,
					IC32x,
					IC32y,
					calldataload(add(pubSignals, 992))
				)

				g1_mulAccC(
					_pVk,
					IC33x,
					IC33y,
					calldataload(add(pubSignals, 1024))
				)

				g1_mulAccC(
					_pVk,
					IC34x,
					IC34y,
					calldataload(add(pubSignals, 1056))
				)

				g1_mulAccC(
					_pVk,
					IC35x,
					IC35y,
					calldataload(add(pubSignals, 1088))
				)

				g1_mulAccC(
					_pVk,
					IC36x,
					IC36y,
					calldataload(add(pubSignals, 1120))
				)

				g1_mulAccC(
					_pVk,
					IC37x,
					IC37y,
					calldataload(add(pubSignals, 1152))
				)

				g1_mulAccC(
					_pVk,
					IC38x,
					IC38y,
					calldataload(add(pubSignals, 1184))
				)

				g1_mulAccC(
					_pVk,
					IC39x,
					IC39y,
					calldataload(add(pubSignals, 1216))
				)

				g1_mulAccC(
					_pVk,
					IC40x,
					IC40y,
					calldataload(add(pubSignals, 1248))
				)

				g1_mulAccC(
					_pVk,
					IC41x,
					IC41y,
					calldataload(add(pubSignals, 1280))
				)

				g1_mulAccC(
					_pVk,
					IC42x,
					IC42y,
					calldataload(add(pubSignals, 1312))
				)

				g1_mulAccC(
					_pVk,
					IC43x,
					IC43y,
					calldataload(add(pubSignals, 1344))
				)

				g1_mulAccC(
					_pVk,
					IC44x,
					IC44y,
					calldataload(add(pubSignals, 1376))
				)

				g1_mulAccC(
					_pVk,
					IC45x,
					IC45y,
					calldataload(add(pubSignals, 1408))
				)

				g1_mulAccC(
					_pVk,
					IC46x,
					IC46y,
					calldataload(add(pubSignals, 1440))
				)

				g1_mulAccC(
					_pVk,
					IC47x,
					IC47y,
					calldataload(add(pubSignals, 1472))
				)

				g1_mulAccC(
					_pVk,
					IC48x,
					IC48y,
					calldataload(add(pubSignals, 1504))
				)

				g1_mulAccC(
					_pVk,
					IC49x,
					IC49y,
					calldataload(add(pubSignals, 1536))
				)

				g1_mulAccC(
					_pVk,
					IC50x,
					IC50y,
					calldataload(add(pubSignals, 1568))
				)

				g1_mulAccC(
					_pVk,
					IC51x,
					IC51y,
					calldataload(add(pubSignals, 1600))
				)

				g1_mulAccC(
					_pVk,
					IC52x,
					IC52y,
					calldataload(add(pubSignals, 1632))
				)

				g1_mulAccC(
					_pVk,
					IC53x,
					IC53y,
					calldataload(add(pubSignals, 1664))
				)

				g1_mulAccC(
					_pVk,
					IC54x,
					IC54y,
					calldataload(add(pubSignals, 1696))
				)

				g1_mulAccC(
					_pVk,
					IC55x,
					IC55y,
					calldataload(add(pubSignals, 1728))
				)

				g1_mulAccC(
					_pVk,
					IC56x,
					IC56y,
					calldataload(add(pubSignals, 1760))
				)

				g1_mulAccC(
					_pVk,
					IC57x,
					IC57y,
					calldataload(add(pubSignals, 1792))
				)

				g1_mulAccC(
					_pVk,
					IC58x,
					IC58y,
					calldataload(add(pubSignals, 1824))
				)

				g1_mulAccC(
					_pVk,
					IC59x,
					IC59y,
					calldataload(add(pubSignals, 1856))
				)

				g1_mulAccC(
					_pVk,
					IC60x,
					IC60y,
					calldataload(add(pubSignals, 1888))
				)

				// -A
				mstore(_pPairing, calldataload(pA))
				mstore(
					add(_pPairing, 32),
					mod(sub(q, calldataload(add(pA, 32))), q)
				)

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

				let success := staticcall(
					sub(gas(), 2000),
					8,
					_pPairing,
					768,
					_pPairing,
					0x20
				)

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

			checkField(calldataload(add(_pubSignals, 1824)))

			checkField(calldataload(add(_pubSignals, 1856)))

			checkField(calldataload(add(_pubSignals, 1888)))

			checkField(calldataload(add(_pubSignals, 1920)))

			// Validate all evaluations
			let isValid := checkPairing(_pA, _pB, _pC, _pubSignals, pMem)

			mstore(0, isValid)
			return(0, 0x20)
		}
	}
}
