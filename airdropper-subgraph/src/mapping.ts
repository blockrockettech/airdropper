import { BigInt } from "@graphprotocol/graph-ts"
import {
  Contract,
  CreditsAdded,
  CreditsRemoved,
  Transfer
} from "../generated/Contract/Contract"
import { TransferTokens } from "../generated/schema"

// export function handleCreditsAdded(event: CreditsAdded): void {
//   let entity = AirdropUser.load(event.params._to.toHexString());
//
//   if (entity == null) {
//     entity = new AirdropUser(event.params._to.toHexString());
//
//     entity.credits = BigInt.fromI32(0);
//     entity._address = event.params._to;
//   }
//
//   entity.credits = entity.credits + event.params._amount;
//   entity.save();
//
//   // Note: If a handler doesn't require existing field values, it is faster
//   // _not_ to load the entity from the store. Instead, create it fresh with
//   // `new Entity(...)`, set the fields that should be updated and save the
//   // entity back to the store. Fields that were not set or unset remain
//   // unchanged, allowing for partial updates to be applied.
//
//   // It is also possible to access smart contracts from mappings. For
//   // example, the contract that has emitted the event can be connected to
//   // with:
//   //
//   // let contract = Contract.bind(event.address)
//   //
//   // The following functions can then be called on this contract to access
//   // state variables and other data:
//   //
//   // - contract.accessWhitelist(...)
//   // - contract.addCredit(...)
//   // - contract.credits(...)
//   // - contract.moveEther(...)
//   // - contract.moveTokens(...)
//   // - contract.pricePerTx(...)
//   // - contract.reduceCredit(...)
//   // - contract.setPricePerTx(...)
//   // - contract.splitter(...)
// }
//
// export function handleCreditsRemoved(event: CreditsRemoved): void {
//   let entity = AirdropUser.load(event.params._to.toHexString());
//   entity.credits = entity.credits - event.params._amount;
//   entity.save();
// }

export function handleTransfer(event: Transfer): void {
  let entity = TransferTokens.load(event.params._caller.toHexString());

  if (entity == null) {
    entity = new TransferTokens(event.params._caller.toHexString());

    entity.token = event._token();
    // fill rest in
  }

  entity.save();
}
