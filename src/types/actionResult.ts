/** Server Action などの成功・失敗を表す判別可能ユニオン */
type ActionFailure = {
	ok: false;
	message: string;
};

type ActionSuccess<T extends Record<string, unknown> = Record<string, never>> = {
	ok: true;
} & T;

export type ActionResult<T extends Record<string, unknown> = Record<string, never>> =
	| ActionSuccess<T>
	| ActionFailure;

/** 追加フィールドなしの ok のみ（内部処理用） */
export type SimpleActionResult = { ok: true } | { ok: false };
