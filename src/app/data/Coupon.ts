export class Coupon {
  public code: string
  public startDate: Date
  public endDate: Date
  public useLimit: number
  public amountOff: number
  public percentageOff: number
  public id?: number

  constructor(
      code: string,
      startDate: Date,
      endDate: Date,
      useLimit: number,
      amountOff: number,
      percentageOff: number,
      id: number) {
    this.code = code
    this.startDate = startDate
    this.endDate = endDate
    this.useLimit = useLimit
    this.amountOff = amountOff
    this.percentageOff = percentageOff
    this.id = id
  }
}
