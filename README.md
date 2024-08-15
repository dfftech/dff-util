## Session Info

```
export type SessionInfo = {
  id: string;
  email?: string;
  mobile?: string;
  name?: string;
  role: string;
  requestId?: string;
  token?: string;
  exp?: number;
};
```

## ErrorResponse

```
new ErrorResponse(message): {
    status: 0,
    message: 'ERROR',
    data: message
}
```

### util

```
UniqueCode();
UniqueByType(name, type) =>  key give Upper case without special char by type
Key(name) =>  key give Upper case without special char
DaysBack(date, addDays, isDays)
AddDays(date, addDays, isDays)
```

## Crypto encrypt

```
crypto.encrypt(text, key) :: string
```

## Crypto decrypt

```
crypto.decrypt(text, key) :: string
```
