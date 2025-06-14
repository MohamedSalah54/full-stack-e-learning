import { InjectModel } from '@nestjs/mongoose';
import { BaseRepo } from '../base.repo';
import { Model, Types } from 'mongoose';
import { Certificate, TCertificate } from './certificate.model';

export class CertificateRepo extends BaseRepo<TCertificate> {
  deleteMany(arg0: { courseId: Types.ObjectId; }) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectModel(Certificate.name) private readonly certificate: Model<TCertificate>,
  ) {
    super(certificate);
    
  }
  createBulk(documents: Partial<TCertificate>[]) {
  return this.createMany(documents);
}

}
