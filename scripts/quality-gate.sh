#!/usr/bin/env bash
# Grep-able half of the section 13 quality bar. Source files only.
cd "$(dirname "$0")/.." || exit 1
SRC=(app components lib)
FAILED=0

check() { # name, expected_count, actual_count, detail
  local name="$1" expect="$2" actual="$3" detail="$4"
  if [ "$actual" = "$expect" ]; then
    printf '  PASS  %-46s %s\n' "$name" "$actual"
  else
    printf '  FAIL  %-46s %s (want %s)\n' "$name" "$actual" "$expect"
    [ -n "$detail" ] && printf '%s\n' "$detail" | sed 's/^/          /'
    FAILED=1
  fi
}

echo "== Section 13 quality bar: static checks =="

n=$(grep -rniE 'box-shadow|shadow-(sm|md|lg|xl|2xl|inner)|drop-shadow|(^|["[:space:]])ring-[0-9a-z]' "${SRC[@]}" --include='*.tsx' --include='*.ts' --include='*.css' | grep -v 'peer-focus-visible' | wc -l | tr -d ' ')
check "zero box-shadows (incl. ring-*)" 0 "$n" "$(grep -rniE 'box-shadow|shadow-(sm|md|lg|xl|2xl|inner)|drop-shadow|(^|["[:space:]])ring-[0-9a-z]' "${SRC[@]}" --include='*.tsx' --include='*.ts' --include='*.css' | grep -v peer-focus-visible)"

n=$(grep -rniE 'gradient|bg-gradient|linear-gradient|radial-gradient|conic-gradient' "${SRC[@]}" --include='*.tsx' --include='*.ts' --include='*.css' | grep -v 'Bricolage_Grotesque\|Grotesque\|grotesque' | wc -l | tr -d ' ')
check "zero gradients" 0 "$n" "$(grep -rniE 'gradient|bg-gradient|linear-gradient' "${SRC[@]}" --include='*.tsx' --include='*.ts' --include='*.css' | grep -v 'Grotesque\|grotesque')"

n=$(grep -rniE '\bInter\b' "${SRC[@]}" --include='*.tsx' --include='*.ts' --include='*.css' | grep -viE 'interactive|internal|interface|intersection|interlock|interpol|winter|printer|inter-|interest' | wc -l | tr -d ' ')
check "zero uses of Inter" 0 "$n" "$(grep -rniE '\bInter\b' "${SRC[@]}" --include='*.tsx' --include='*.ts' --include='*.css' | grep -viE 'interactive|internal|interface|intersection|interlock|interpol|winter|printer|inter-|interest')"

n=$(grep -rn 'backdrop-blur\|backdrop-filter\|blur(' "${SRC[@]}" --include='*.tsx' --include='*.css' | wc -l | tr -d ' ')
check "zero backdrop-blur" 0 "$n"

n=$(grep -rnoE 'rounded-(?!control|chip)[a-z0-9-]*' "${SRC[@]}" --include='*.tsx' -P 2>/dev/null | grep -v 'rounded-control\|rounded-chip\|rounded-none' | wc -l | tr -d ' ')
check "no radius beyond control/chip" 0 "$n" "$(grep -rnoE 'rounded-[a-z0-9-]*' "${SRC[@]}" --include='*.tsx' | grep -v 'rounded-control\|rounded-chip\|rounded-none')"

n=$(grep -rn '!' "${SRC[@]}" --include='*.tsx' | grep -oE '[a-z,)"] ?![ "<]' | wc -l | tr -d ' ')
check "zero exclamation marks in copy" 0 "$n" "$(grep -rn '[a-z,)] \?![ \"<]' "${SRC[@]}" --include='*.tsx')"

n=$(grep -rnP '[\x{1F300}-\x{1FAFF}\x{2600}-\x{27BF}\x{FE0F}\x{2190}-\x{21FF}\x{2700}-\x{27BF}]' "${SRC[@]}" --include='*.tsx' --include='*.ts' --include='*.css' 2>/dev/null | wc -l | tr -d ' ')
check "zero emoji / pictographs" 0 "$n" "$(grep -rnP '[\x{1F300}-\x{1FAFF}\x{2600}-\x{27BF}\x{FE0F}]' "${SRC[@]}" --include='*.tsx' 2>/dev/null)"

n=$(grep -rniE 'little one|bundle of joy|tiny humans|precious|magical|snuggle|cosy|cozy|wrapped in love|journey' "${SRC[@]}" --include='*.tsx' --include='*.ts' | wc -l | tr -d ' ')
check "zero banned words" 0 "$n" "$(grep -rniE 'little one|bundle of joy|tiny humans|precious|magical|snuggle|cosy|cozy|wrapped in love|journey' "${SRC[@]}" --include='*.tsx' --include='*.ts')"

n=$(grep -rn 'outline-none\|outline: none\|focus:outline-0' "${SRC[@]}" --include='*.tsx' --include='*.css' | wc -l | tr -d ' ')
check "focus never suppressed" 0 "$n" "$(grep -rn 'outline-none\|outline: none' "${SRC[@]}" --include='*.tsx' --include='*.css')"

n=$(grep -rnE ': *any\b|<any>|as any|@ts-ignore|@ts-expect-error|@ts-nocheck' "${SRC[@]}" --include='*.tsx' --include='*.ts' | wc -l | tr -d ' ')
check "no any / ts-ignore" 0 "$n" "$(grep -rnE ': *any\b|as any|@ts-ignore|@ts-expect-error' "${SRC[@]}" --include='*.tsx' --include='*.ts')"

n=$(grep -rniE '\bTODO\b|\bFIXME\b|lorem ipsum|PLACEHOLDER_|placeholder text|\bXXX\b' "${SRC[@]}" --include='*.tsx' --include='*.ts' | wc -l | tr -d ' ')
check "no TODO / placeholder / lorem" 0 "$n" "$(grep -rniE '\bTODO\b|\bFIXME\b|lorem ipsum|placeholder text' "${SRC[@]}" --include='*.tsx' --include='*.ts')"

# Raw hex outside the token definition in globals.css
n=$(grep -rnE '#[0-9A-Fa-f]{6}\b' app components lib --include='*.tsx' --include='*.ts' | grep -v '^lib/tokens.ts:' | wc -l | tr -d ' ')
check "no raw hex outside lib/tokens.ts" 0 "$n" "$(grep -rnE '#[0-9A-Fa-f]{6}\b' app components lib --include='*.tsx' --include='*.ts' | grep -v '^lib/tokens.ts:')"

echo
echo "== token drift: globals.css vs lib/tokens.ts =="
if node scripts/check-tokens.mjs; then :; else FAILED=1; fi

# Every price path goes through the tabular class
n=$(grep -rn 'formatPrice' app components --include='*.tsx' | grep -v 'components/Price.tsx' | wc -l | tr -d ' ')
check "formatPrice only used inside Price" 0 "$n" "$(grep -rn 'formatPrice' app components --include='*.tsx' | grep -v 'components/Price.tsx')"

echo
echo "== 'use client' inventory (each must have state/ref/handler) =="
# The directive is only a directive on the first line; a mention in a comment is not.
for f in $(grep -rl --include='*.tsx' "" app components | sort); do
  head -1 "$f" | grep -q "^'use client'" || continue
  if grep -qE 'useState|useRef|useEffect|useReducer|useContext|onClick|onChange|onSubmit|onPointer|onKey|useSearchParams|useRouter|createContext' "$f"; then
    printf '  ok    %s\n' "$f"
  else
    printf '  FAIL  %s has no client-only reason\n' "$f"; FAILED=1
  fi
done

echo
if [ "$FAILED" = 0 ]; then echo "ALL STATIC CHECKS PASS"; else echo "STATIC CHECKS FAILED"; fi
exit $FAILED
