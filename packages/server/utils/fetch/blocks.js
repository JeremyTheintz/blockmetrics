import axios from 'axios';
import crypto from 'crypto';
import { ethers } from 'ethers';
import { chains } from '../../server.js';
import { createDbPool } from '../pool/pool.js';
import {
	getLastBlockParsedFromBlockParsed,
	increaseTxCountInBlockchain,
	insertBlockchainHasAccount,
	insertHashrateInHashrateHistory,
	insertOrUpdateAccount,
	udpdateBlockCountInBlockParsed,
	updateDifficultyInBlockchain,
	updateHashrateInBlockchain,
	updateTimeBetweenBlocksInBlockchain,
	updateTxCountInBlockchain
} from '../sql.js';

export async function fetchEVMBlocksFor(chain) {
	let updatableCon = null;

	const { id, rpc, name } = chain;

	if (!updatableCon) {
		try {
			const pool = await createDbPool();
			updatableCon = await pool.getConnection();
		} catch (err) {
			console.error("fetchEVMBlocksFor can't update connexion for " + name, err);
		}
	}

	let lastBlockCheck;

	try {
		const res = await updatableCon.query(getLastBlockParsedFromBlockParsed, [id]);

		if (res.length !== 0) {
			lastBlockCheck = res[0][0].number;

			const provider = new ethers.providers.JsonRpcProvider(rpc);

			let block = 'not null';
			let index = lastBlockCheck;
			let lastBlockTimestamp = 0;

			while (block) {
				let startTime = Date.now();
				index++;
				block = await provider.getBlockWithTransactions(index);
				const transactions = block.transactions;

				/* function to know if an address is a contract or not to expensive but will do in the future
                const txPromises = transactions
					.map(({ from }) =>
						provider.getCode(from).then((res) => {
							if (res === '0x') {
								return {
									public_address: from,
									timestamp: block.timestamp
								};
							} else {
								return null;
							}
						})
					)
					.filter((res) => res !== null);
                    */

				const txPromises = transactions.map(({ from }) => ({
					public_address: from,
					timestamp: block.timestamp
				}));

				const resolvedTxPromises = await Promise.all(txPromises);

				if (process.env.DEBUG_LOGS === 'activated') {
					console.log(name + ' tx added to db: ' + resolvedTxPromises.length);
				}

				// calculate time between this block and the last one
				const timeBetweenTwoBlocks = (block.timestamp - lastBlockTimestamp) / 1000;
				lastBlockTimestamp = block.timestamp;

				// TODO : improve blockchain update with a call to update all values
				const promises = [
					updatableCon.query(udpdateBlockCountInBlockParsed, [index, id]),
					updatableCon.query(increaseTxCountInBlockchain, [transactions.length, id]),
					...resolvedTxPromises
						.map(({ public_address, timestamp }) => [
							updatableCon.query(insertOrUpdateAccount, [public_address, timestamp, timestamp, timestamp, id]),
							updatableCon.query(insertBlockchainHasAccount, [id, public_address])
						])
						.flat(1),
					updatableCon.query(updateTimeBetweenBlocksInBlockchain, [timeBetweenTwoBlocks, id]),
					updatableCon.query(updateDifficultyInBlockchain, [block.difficulty, id])
				];

				await Promise.all(promises);

				if (process.env.DEBUG_LOGS === 'activated') {
					console.log(name + ' block n°' + index + ' fetched and saved in db in ' + (Date.now() - startTime) + 'ms');
				}
			}

			if (process.env.DEBUG_LOGS === 'activated') {
				console.log("All new " + name + ' blocks fetched and saved in db');
			}

			updatableCon?.destroy();

			setTimeout(() => {
				if (process.env.DEBUG_LOGS === 'activated') {
					console.log('> start fetching new blocks for ' + name);
				}
				fetchEVMBlocksFor({ id, rpc, name });
			}, 1 * 60 * 1000);
		} else {
			throw new Error("can't fetch block_parsed number for " + name);
		}
	} catch (err) {
		console.error('fetch blocks n°' + lastBlockCheck + " on " + name, err);

		updatableCon?.destroy();

		setTimeout(() => {
			fetchEVMBlocksFor({ id, rpc, name });
		}, 1 * 60 * 1000);
	}
}

export async function fetchBitcoinData() {
	const { id, name } = chains.bitcoin;

	let updatableCon = null;

	if (!updatableCon) {
		try {
			const pool = await createDbPool();
			updatableCon = await pool.getConnection();
		} catch (err) {
			console.error("fetchBitcoinData can't update connexion", err);
		}
	}

	try {
		let startTime = Date.now();
		const url = 'https://api.blockchain.info/stats';

		const res = await axios.get(url);

		const {
			timestamp,
			market_price_usd,
			hash_rate,
			total_fees_btc,
			n_btc_mined,
			n_tx,
			n_blocks_mined,
			minutes_between_blocks,
			totalbc,
			n_blocks_total,
			estimated_transaction_volume_usd,
			blocks_size,
			miners_revenue_usd,
			nextretarget,
			difficulty,
			estimated_btc_sent,
			miners_revenue_btc,
			total_btc_sent,
			trade_volume_btc,
			trade_volume_usd
		} = res.data;

		const hashrateUuid = crypto.randomUUID();

		// TODO : improve blockchain update with a call to update all values
		const promises = [
			updatableCon.query(udpdateBlockCountInBlockParsed, [n_blocks_total, id]),
			updatableCon.query(updateTxCountInBlockchain, [n_tx, id]),
			updatableCon.query(insertHashrateInHashrateHistory, [hashrateUuid, hash_rate, id]),
			updatableCon.query(updateHashrateInBlockchain, [hash_rate, id]),
			updatableCon.query(updateDifficultyInBlockchain, [difficulty, id]),
			updatableCon.query(updateTimeBetweenBlocksInBlockchain, [minutes_between_blocks * 60, id])
		];

		await Promise.all(promises);

		if (process.env.DEBUG_LOGS === 'activated') {
			console.log(name + ' data fetched and saved in db in ' + (Date.now() - startTime) + 'ms');	
		}

		const timeBetweenNextUpdate = minutes_between_blocks + 0.5;

		if (process.env.DEBUG_LOGS === 'activated') {
			console.log('Bitcoin data updated');
			console.log('next update in ' + timeBetweenNextUpdate + ' minutes');
		}

		updatableCon?.destroy();

		setTimeout(() => {
			fetchBitcoinData();
		}, timeBetweenNextUpdate * 60 * 1000);
	} catch (err) {
		console.error('fetchBitcoinBlocks', err);

		updatableCon?.destroy();

		setTimeout(() => {
			fetchBitcoinData();
		}, 1 * 60 * 1000);
	}
}
