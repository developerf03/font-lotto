export default {
  home: 'หน้าแรก',
  login: 'เข้าสู่ระบบ',
  logout: 'ออกจากระบบ',
  welcome: 'ยินดีต้อนรับ!',
  depositMethods: 'ช่องทางการฝาก',
  withdrawMethods: 'ช่องทางการถอน',
  serviceProviderChannel: 'ช่องทางผู้ให้บริการ',
  selectDepositMethod: 'เลือกช่องทางการฝาก',
  selectWithdrawMethod: 'เลือกช่องทางการถอน',
  selectServiceProvider: 'เลือกช่องทางผู้ให้บริการ',
  onlineBanking: 'ธนาคารออนไลน์',
  mobileBanking: 'โมบายแบงค์กิ้ง',
  creditCard: 'บัตรเครดิต',
  minimum: '(ขั้นต่ำ {min})',
  maximum: '(สูงสุด {max})',
  minMax: '(ขั้นต่ำ {min} / สูงสุด {max})',
  transactionHistory: 'ประวัติธุรกรรม',
  noItems: 'ไม่พบข้อมูล',
  notAcceptingPromotions: 'ไม่รับโปรโมชั่น',
  promotions: 'โปรโมชั่น',
  selectPromotion: 'เลือกโปรโมชั่น',
  withdraw: 'ถอน',
  deposit: 'ฝาก',
  copySuccess: 'คัดลอกสำเร็จ',
  success: 'สำเร็จ',
  inProgress: 'กำลังดำเนินการ',
  pending: 'รอดำเนินการ',
  error: 'เกิดความผิดพลาด',
  ok: 'ตกลง',
  save: 'บันทึก',
  cancel: 'ยกเลิก',
  back: 'กลับ',
  next: 'ถัดไป',
  alert: 'แจ้งเตือน',
  closedAll: 'ปิดทั้งหมด',
  cancelTransaction: 'ยกเลิกรายการ',
  pendingTransaction: 'ไม่พบธุรกรรมที่รอดำเนินการ',
  warningCancelItem: 'คุณต้องการยกเลิกรายการนี้หรือไม่?',
  phone: 'เบอร์โทรศัพท์',
  email: 'อีเมล',
  username: 'ชื่อผู้ใช้',
  password: 'รหัสผ่าน',
  pleaseEnter: 'กรุณากรอก',
  forgotPassword: 'ลืมรหัสผ่าน',
  dontHaveAccount: 'ยังไม่มีบัญชี ?',
  register: 'สมัครสมาชิก',
  withdrawalConditions: 'เงื่อนไขการถอน',
  remainingBet: 'เดิมพันคงเหลือ',
  remainingBalance: 'ยอดเงินคงเหลือ',
  verifyOTP: 'ยืนยัน OTP',
  enterCodeWeSentTo: 'ใส่รหัส {digit} หลัก ที่เราส่งไปยัง',
  resendCode: 'ขอรหัสใหม่',
  resendWithin: 'ขอรหัสใหม่ ภายใน {second} วินาที',
  successfulIdentityVerification: 'ยืนยันตัวตนสำเร็จ',
  verifyYourEmail: 'ยืนยันอีเมลของคุณ',
  invalidCodeTryAgain: 'รหัสไม่ถูกต้อง ลองอีกครั้ง',
  OTPhasExpiredTryAgain: 'รหัส OTP หมดอายุ ลองอีกครั้ง',
  OTPisInvalid: 'รหัส OTP ไม่ถูกต้อง',
  OTPhaveBeenVerified: 'รหัส OTP ถูกยืนยันแล้ว',
  sendingOTPfailed: 'ส่งรหัส OTP ไม่สำเร็จ',
  or: 'หรือ',

  promotionConditions: {
    redeem: 'แจกโค้ดจำนวน {amount} โค้ด',
    deposit: {
      common: {
        between: 'ฝากเงิน {min} - {max} {currency}',
        gte: 'ฝากเงินขั้นต่ำ {amount} {currency}',
        gt: 'ฝากเงินมากกว่า {amount} {currency}',
        eq: 'ฝากเงิน {amount} {currency}',
      },
      happytime: 'ฝากเงินในช่วงเวลา {start} - {end} น.',
      times_a_day: 'รับได้ไม่เกิน {amount} ครั้งต่อวัน',
      first: {
        between: 'ฝากเงินครั้งแรก {min} - {max} {currency}',
        gte: 'ฝากเงินครั้งแรกขั้นต่ำ {amount} {currency}',
        gt: 'ฝากเงินครั้งแรกมากกว่า {amount} {currency}',
        eq: 'ฝากเงินครั้งแรก {amount} {currency}',
      },
      once_a_day: {
        between: 'ฝากเงินครั้งแรก {min} - {max} {currency}',
        gte: 'ฝากเงินครั้งแรกขั้นต่ำ {amount} {currency}',
        gt: 'ฝากเงินครั้งแรกมากกว่า {amount} {currency}',
        eq: 'ฝากเงินครั้งแรก {amount} {currency}',
      },
    },
    withdraw: {
      turnover: {
        credit: 'ต้องมีจำนวนยอดเงินคงเหลือ {x} เท่าของยอดฝาก',
        category: 'ต้องมีจำนวนเดิมพันรวมของหมวด {category} ทั้งหมด {x} เท่าของยอดฝาก',
        all: 'ต้องมีจำนวนเงินเดิมพันรวมของหมวดใดก็ได้ {x} เท่าของยอดฝาก',
        lotto: 'ต้องมีจำนวนเดิมพันรวมของหมวด {category} ทั้งหมด {x} เท่าของยอดฝาก',
      },
      turnoverLabel: {
        credit: 'ต้องมีจำนวนยอดเงินคงเหลือ',
        category: 'ต้องมีจำนวนเดิมพันรวมของหมวด {category}',
        all: 'ต้องมีจำนวนเงินเดิมพันรวมของหมวดใดก็ได้',
      },
    },
    benefit: {
      credit: 'ได้รับ {amount} {currency}',
      multiply: 'ได้รับเครดิตจำนวน {x} เท่าของยอดฝาก แต่ไม่เกิน {amount} {currency}',
      percent: 'ได้รับเครดิตจำนวน {percent}% ของยอดฝาก แต่ไม่เกิน {amount} {currency}',
      freespin: 'ได้รับฟรีสปินของเกม {game}',
      luckyWheel: 'ได้รับตั๋วกงล้อลุ้นโชค {amount} ตั๋ว',
    },
  },
  table: {
    amount: 'จำนวนเงิน',
  },

  validation: {
    pleaseEnterPassword: 'กรุณากรอกรหัสผ่าน',
    pleaseEnterPhoneNumber: 'กรุณากรอกเบอร์โทรศัพท์',
    pleaseEnterEmail: 'กรุณากรอกอีเมล',
    invalidPhoneNumber: 'เบอร์โทรศัพท์ไม่ถูกต้อง',
    emailInValid: 'กรุณากรอกรูปแบบอีเมลให้ถูกต้อง',
  },
  2000: 'เกตเวย์ไม่พร้อมใช้งาน',
  2544: 'เกตเวย์ในตัวแทนไม่พร้อมใช้งาน',
  2545: 'ช่องทางในตัวแทนไม่พร้อมใช้งาน',
  2546: 'หมายเลขบัญชีที่ต้องใช้เกตเวย์นี้',
  3001: 'รูปแบบคำขอไม่ถูกต้อง',
  3002: 'โทเค็นคำขอไม่ถูกต้อง',
  3003: 'ไม่พบโทเค็นคำขอ',
  3004: 'โทเค็นคำขอหมดอายุ',
  3005: 'คำขอลายเซ็นไม่ถูกต้อง',
  3006: 'ไม่พบลายเซ็นคำขอ',
  3007: 'คำขอแฮชไม่ถูกต้อง',
  3008: 'ไม่พบแฮชคำขอ',
  3009: 'ไม่พบโทเค็นการรีเฟรช',
  3010: 'มีการใช้โทเค็นแล้ว',
  4000: 'ไม่พบผู้ใช้',
  4001: 'ไม่พบตัวแทน',
  4002: 'ไม่พบกระเป๋าเงิน',
  4003: 'ไม่พบเกม',
  4004: 'ไม่พบเซสชัน',
  4005: 'ไม่พบรายละเอียดเกม',
  4006: 'สกุลเงินของคุณไม่รองรับ',
  4007: 'ไม่พบเกม',
  4008: 'กระเป๋าเงินมีอยู่แล้ว',
  4009: 'ตัวแทนกระเป๋าเงินไม่รองรับสกุลเงินนี้',
  4010: 'บัญชีนี้มีอยู่แล้ว',
  4011: 'ไม่มีบัญชีถอนเงินนี้',
  4012: 'ถอนบัญชีเกินขีดจำกัด',
  4013: 'การถอนการอัปเดตบัญชีล้มเหลว',
  4014: 'บัญชีถอนเริ่มต้นไม่สามารถลบได้',
  4015: 'บัญชีถอนเงินเริ่มต้นแล้ว',
  4016: 'ยอดเงินของคุณไม่เพียงพอ',
  4017: 'ไม่สามารถถอนบัญชีออกได้',
  4018: 'โปรดเพิ่มบัญชีธนาคารเริ่มต้น',
  4019: 'บัญชีธนาคารไม่ถูกต้อง',
  4020: 'บัญชี Crypto ไม่ถูกต้อง',
  4021: 'บัญชีนี้ไม่สามารถใช้ได้',
  4024: 'ประเภทพารามิเตอร์ไม่ถูกต้องสำหรับฟังก์ชันนี้ กรุณาใช้ประเภท = ติดตามหรือเลิกติดตาม',
  4025: 'เกมนี้มีอยู่แล้วในผู้เล่นรายนี้',
  4026: 'เกมนี้ไม่มีอยู่ในผู้เล่นรายนี้',
  4028: 'ไม่พบผู้ให้บริการในตัวแทน',
  4038: 'ขออภัย มีการเข้าสู่ระบบจากอีกเครื่อง',
  4039: 'ไม่พบ CMS',
  4040: 'ช่องไม่ถูกต้อง',
  4041: 'เกตเวย์การชำระเงินไม่ถูกต้อง',
  4042: 'คำขอนี้จำเป็นต้องมีการรับรองความถูกต้อง',
  4043: 'ไม่พบบัญชีธนาคารด้วยสกุลเงินของคุณ',
  4044: 'ไม่พบบัญชี Crypto ด้วยสกุลเงินของคุณ',
  4045: 'ไม่สามารถรับรายชื่อธนาคาร',
  4046: 'ไม่พบโปรโมชั่นโค้ดนี้',
  4047: 'ไม่พบประเภทการส่งเสริมการขาย/ประเภทย่อย',
  4048: 'ไม่พบสิทธิประโยชน์ในการส่งเสริมการขาย',
  4049: 'ไม่พบเงื่อนไขกลุ่มโปรโมชัน',
  4050: 'ไม่พบจำนวนเงินฝาก',
  4051: 'สกุลเงินส่งเสริมการขายไม่ตรงกับสกุลเงินฝาก',
  4052: 'โปรโมชั่นโค้ดนี้หมดอายุแล้ว',
  4053: 'โปรโมชั่นกำลังจะมาถึง',
  4054: 'ประเภทโปรโมชันไม่ถูกต้อง',
  4055: 'เงื่อนไขโปรโมชั่นไม่ถูกต้อง กรุณาตรวจสอบใหม่อีกครั้ง',
  4056: 'ธุรกรรมอยู่ระหว่างดำเนินการแล้ว โปรดลองอีกครั้งในภายหลัง',
  4057: 'ไม่พบเงื่อนไขกลุ่มเงินฝากโปรโมชั่น',
  4058: 'ไม่พบรหัสโปรโมชันและรหัสโปรโมชัน',
  4059: 'รหัสโปรโมชันนี้ยังอยู่ระหว่างดำเนินการ โปรดรอการอัปเดตธุรกรรม',
  4060: 'คุณมียอดเงินมากกว่าขั้นต่ำของการฝาก',
  4061: 'รายการฝากอยู่ระหว่างดำเนินการ โปรดรอการอัปเดตธุรกรรม',
  4062: 'ถอนเงินอยู่ระหว่างดำเนินการ โปรดรอการอัปเดตธุรกรรม',
  4063: 'โปรดปฏิบัติตามเงื่อนไขการถอนโปรโมชั่นให้เสร็จสิ้นก่อน และถอน/ลดเครดิตผู้เล่นต่ำกว่าขีดจำกัด',
  4064: 'โปรโมชั่นโค้ดนี้ถูกใช้แล้ว',
  4065: 'บัญชีนี้มีอยู่แล้ว',
  4066: 'ไม่มีบัญชีนี้',
  4067: 'ไม่พบแคชแบ็ค',
  4068: 'บริการชำระค่าบริการสร้างผู้ใช้เสมือนล้มเหลว',
  4069: 'โซลูชันที่ต้องจ่ายเพื่อสร้างบัญชีถอน',
  4070: 'ส่ง SMS ถึงผู้เล่นล้มเหลว',
  4071: 'รหัสบริการชำระเงินโซลูชันไม่ถูกต้อง',
  4072: 'บริการชำระค่าบริการ โปรดเพิ่มวันเกิดจริงของคุณในการตั้งค่าโปรไฟล์ของคุณ',
  4073: 'บริการ SMS KRW ไม่พบเงินฝากธนาคาร',
  4074: 'ไม่พบ SMS Credentails',
  4075: 'บริการการชำระเงินไม่รองรับในประเทศ',
  4076: 'ไม่พบบทความ',
  4078: 'กรุณาทำเทิร์นมากกว่าหรือเท่ากับ {turnover} จึงจะสามารถถอนได้',
  4079: 'บริการชำระเงินโซลูชัน ไม่พบลิงก์ลงทะเบียน',
  4080: 'บริการชำระเงินโซลูชัน ไม่พบข้อมูลรับรอง',
  4081: 'ไม่พบรายการระดับ',
  4082: 'สกุลเงินของคุณไม่รองรับ',
  4083: 'ระดับผู้เล่นไม่ตรงกันระดับโปรโมชั่น',
  4084: 'ธนาคารอยู่ในระหว่างการบำรุงรักษาตั้งแต่ {start} - {end} ({timezone})',
  4085: 'เงื่อนไขการถอนแบบซ้อนล้มเหลว',
  4086: 'กรุณาฝากรายการใหม่อีกครั้งก่อนได้รับ',
  4088: 'ผู้เล่นคนนี้มีธุรกรรมที่ยังไม่ได้ดำเนินการ ไม่สามารถคำนวณได้',
  4089: 'ผู้เล่นคนนี้มีธุรกรรมฟรีสปิน ไม่สามารถคำนวณได้',
  4090: 'ผู้เล่นคนนี้ได้คำนวณเงินคืนแล้ว โปรดรอรอบถัดไป',
  4091: 'ผู้เล่นคนนี้ไม่มีธุรกรรมฝากเงินก่อนหน้านี้',
  4092: 'ตัวแทนนี้ไม่มีโปรโมชั่นเงินคืนสำหรับสิ่งนี้',
  4095: 'ไม่สามารถรับเงินคืนได้ในวันนี้ เนื่องจากพ้นกำหนดชำระแล้ว',
  4096: 'ได้รับเงินคืนแล้วไม่สามารถรับได้อีก โปรดรับอีกครั้งในวันครบกำหนดครั้งถัดไป',
  4097: 'ไม่สามารถรับยอดเสียได้ เนื่องจากคุณมียอดเสียมากกว่ายอดเสียสะสม',
  4098: 'ไม่สามารถลดเครดิตจากกระเป๋าหลักได้ โปรดติดต่อผู้ดูแลระบบ',
  5000: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง',
  5001: 'อีเมลผู้เล่นซ้ำ',
  5002: 'กรุณายืนยันอีเมล ก่อนทำรายการถอนเงิน',
  5003: 'มีคำขอมากเกินไป โปรดลองอีกครั้งในภายหลัง',
  5004: 'นามแฝงนี้ถูกใช้แล้ว',
  5005: 'อีเมลได้รับการยืนยันแล้ว',
  5006: 'กรุณาลองอีกครั้งในภายหลัง',
  5007: 'ชื่อผู้ใช้ผู้เล่นซ้ำ',
  5008: 'ขออภัย โทเค็นของคุณหมดอายุ กรุณาเข้าสู่ระบบอีกครั้ง',
  5009: 'ไม่มีการกำหนดอัตราแลกเปลี่ยน',
  5010: 'ผู้เล่นกระเป๋าเงินไม่รองรับสกุลเงินนี้',
  5019: 'ไม่พบโค้ดผู้เล่น',
  5020: 'รหัสผ่านเดิมไม่ถูกต้อง',
  5021: 'ไม่มีรหัสอ้างอิง',
  5022: 'เบอร์โทรศัพท์นี้ถูกใช้แล้ว',
  5023: 'โทรศัพท์ไม่ยืนยัน',
  5024: 'หมายเลขโทรศัพท์ของผู้เล่นนี้ได้รับการยืนยันแล้ว',
  5025: 'หมายเลขซ้ำ',
  5026: 'ผู้เล่นรายนี้ซ้ำรหัสผ่าน',
  5027: 'รหัสผ่านเดิมไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง',
  5028: 'จำเป็นต้องระบุวันเกิด',
  5029: 'จำเป็นต้องระบุธนาคาร',
  5030: 'บัญชีธนาคารซ้ำกัน',
  5031: 'ชื่อบัญชีธนาคารซ้ำ',
  5032: 'ชื่อบัญชีธนาคารและหมายเลขบัญชีธนาคารซ้ำ',
  5033: 'ชื่อบัญชีธนาคารและรหัสธนาคารซ้ำ',
  5034: 'ชื่อบัญชีธนาคารและรหัสธนาคารและหมายเลขบัญชีธนาคารซ้ำ',
  5035: 'รหัสธนาคารและหมายเลขบัญชีธนาคารซ้ำ',
  5036: 'รหัสการลงทะเบียนพันธมิตรไม่ถูกต้อง',
  5039: 'Alpha จำเป็นต้องสร้างบัญชีถอน',
  6000: 'สร้างผู้เล่นล้มเหลว',
  6001: 'การอัปเดตผู้เล่นล้มเหลว',
  6002: 'สร้างกระเป๋าเงินล้มเหลว',
  6003: 'การอัปเดตกระเป๋าเงินล้มเหลว',
  6004: 'สร้างผู้ใช้ล้มเหลว',
  6005: 'การอัปเดตผู้ใช้ล้มเหลว',
  6006: 'การแจ้งเตือนการแก้ไขล้มเหลว',
  6007: 'ไม่พบการแจ้งเตือนที่มีสถานะยังไม่ได้อ่าน',
  6008: 'สร้างข้อเสนอแนะล้มเหลว',
  6009: 'โปรดระบุสกุลเงินก่อนที่คุณจะสร้างบัญชีธนาคาร',
  6039: 'รหัส OTP ไม่ถูกต้อง',
  6040: 'รหัส OTP ถูกยืนยันแล้ว',
  6041: 'กรุณารอสักครู่ก่อนทำรายการอีกครั้ง',
  6042: 'สกุลเงินไม่ถูกต้องสำหรับการสร้างบัญชีธนาคาร',
  6043: 'กรุณาส่งประเภทติดตามฝากหรือถอน',
  6044: 'สกุลเงินไม่ถูกต้องสำหรับการสร้างบัญชี Crypto',
  6045: 'เทมเพลตไม่พร้อมใช้งานสำหรับตัวแทนรายนี้',
  6046: 'รายละเอียดเทมเพลตไม่พร้อมใช้งานสำหรับตัวแทนรายนี้',
  6047: 'ไม่พบการส่งเสริมการขายในการทำธุรกรรมล่าสุดกับผู้เล่นรายนี้',
  6048: 'ไม่สามารถเล่นเกมในหมวดหมู่นี้ได้ กรุณาเล่นเกมตามหมวดหมู่ของโปรโมชั่นเท่านั้น',
  6049: 'รหัส OTP หมดอายุ ลองอีกครั้ง',
  6050: 'ส่ง SMS ล้มเหลว',
  6051: 'รหัสผ่านใหม่ของคุณไม่สามารถเหมือนกับรหัสผ่านเดิมได้',
  7000: 'เพิ่มเกมโปรดล้มเหลว ผู้เล่นนี้มีเกมนี้อยู่แล้ว',
  7001: 'ลบเกมโปรดล้มเหลว เกมนี้ไม่มีอยู่ในผู้เล่นนี้',
  7003: 'ลบเกมโปรดล้มเหลว เกมนี้ไม่มีอยู่ในเครื่องเล่นนี้',
  7004: 'ไม่มีผู้เล่นอยู่ในตัวแทนนี้',
  7005: 'ไม่พบอีเมลนี้ กรุณาตรวจสอบ',
  7006: 'มีการทำธุรกรรมแล้ว',
  7007: 'ส่งรหัส OTP ไม่สำเร็จ',
  7008: 'ไม่มีโทรศัพท์',
  7009: 'ประเภทบัญชีธนาคารไม่ถูกต้อง',
  7500: 'ไม่พบร้านค้าในตัวแทน',
  7501: 'ไม่พบ Google Store ในตัวแทน',
  7502: 'รอการอัปเดตสถานะการชำระเงินของ Google',
  7503: 'ธุรกรรมที่ซ้ำกัน',
  7506: 'ไม่พบร้านค้า',
  7507: 'ไม่พบรายการร้านค้า',
  7508: 'ข้อผิดพลาดบริการ Apple App',
  7509: 'บริการ Google Play เกิดข้อผิดพลาด',
  8001: 'เครดิตตัวแทนไม่เพียงพอ',
  8002: 'โปรดติดต่อผู้ดูแลระบบ',
  8003: 'ไม่มีรายละเอียดธุรกรรม',
  8004: 'ไม่พบรายการธุรกรรม',
  8005: 'ยอดคงเหลือในกระเป๋าสตางค์ของบุคคลที่สามไม่เพียงพอ',
  8006: 'ไม่พบค่าคอมมิชชั่นสำหรับผู้เล่นรายนี้',
  8007: 'ไม่สามารถรับค่าคอมมิชชันได้',
  8009: 'ข้อผิดพลาดของปลั๊กอิน',
  8010: 'ตัวเรียกใช้งานล้มเหลว',
  8011: 'ผู้ใช้นี้ไม่สามารถใช้งานได้',
  8012: 'ไม่สามารถใช้เงินคืนได้ในเวลานี้',
  8013: 'ไม่สามารถรับเงินคืนได้',
  8014: 'บริการ SMS ไม่สามารถใช้งานได้',
  8103: 'ไม่พบกิจกรรม',
  8104: 'กิจกรรมมีอยู่แล้ว',
  8105: 'เปอร์เซ็นต์น้อยกว่า 100',
  8106: 'ผู้เล่นไม่มีตั๋วเหตุการณ์',
  8107: 'สร้างรางวัลให้กับผู้เล่นไม่สำเร็จ',
  8108: 'อัปเดตรางวัลสำหรับผู้เล่นไม่สำเร็จ',
  8109: 'ผู้เล่นไม่มีรางวัล',
  8110: 'แทรกผู้เล่นเหตุการณ์ไม่สำเร็จ',
  8111: 'ไม่สามารถรับผลประโยชน์ได้',
  8112: 'กระเป๋าเงินผู้เล่นมากกว่าการตั้งค่าการฝากเงิน',
  8113: 'แลกรหัสไม่สามารถใช้ได้ในขณะนี้',
  8114: 'รหัสแลกไม่ตรงกันหรือหมดอายุ',
  8115: 'แทรกการแลกธุรกรรมไม่สำเร็จ',
  8116: 'ผู้เล่นแลกรหัสนี้แล้ว',
  8117: 'ไม่สามารถรับค่าคอมมิชชันแบบพีระมิดได้',
  8118: 'ไม่มีดาวน์ไลน์สำหรับผู้เล่นรายนี้',
  8119: 'Tree เพิ่มหัวข้อข่าวแล้วหรือไม่มีดาวน์ไลน์',
  8120: 'ภาษาไม่รองรับ',
  8121: 'ค่าคอมมิชชั่นของคุณต้องมีขั้นต่ำ {min} {currency} จึงจะสามารถกดรับได้',
  8123: 'ไม่มีเงินฝากเพื่อคำนวณเงินคืน',
  8124: 'กรุณาคำนวณเงินคืนก่อนที่คุณจะได้รับเงินคืน',
  8126: 'มีธุรกรรมใหม่ให้คำนวณ โปรดคำนวณก่อน',
  8129: 'การสร้างบัญชีการชำระเงินล้มเหลว',
  8134: 'เครดิตน้อยกว่าการตั้งค่าการรับขั้นต่ำ',
  9001: 'คุณถูกแบนจากระบบ กรุณาติดต่อผู้ดูแลระบบ',
  9999: 'เกิดข้อผิดพลาด กรุณาลองใหม่',
}
